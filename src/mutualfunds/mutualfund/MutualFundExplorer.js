import React, { useState } from 'react';
import mutualFunds from '../mutualfundData/mutualfund.json';

const getUnique = (arr, key) => [...new Set(arr.map(item => item[key]))].filter(Boolean);

const MutualFundExplorer = () => {
  const [selectedAmcs, setSelectedAmcs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({ amc: true, category: true });

  const amcList = getUnique(mutualFunds, 'AMC');
  const categoryList = getUnique(mutualFunds, 'Scheme Category');

  const filteredFunds = mutualFunds.filter(fund => {
    const amcMatch = selectedAmcs.length === 0 || selectedAmcs.includes(fund.AMC);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(fund['Scheme Category']);
    const searchMatch = search === '' || fund['Scheme Name'].toLowerCase().includes(search.toLowerCase());
    return amcMatch && categoryMatch && searchMatch;
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAmcChange = amc => {
    setSelectedAmcs(prev => prev.includes(amc) ? prev.filter(a => a !== amc) : [...prev, amc]);
  };

  const handleCategoryChange = cat => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const clearAll = () => {
    setSelectedAmcs([]);
    setSelectedCategories([]);
    setSearch('');
  };

  return (
    <div style={{ display: 'flex', padding: 32, gap: 32, fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

      {/* Sidebar */}
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Header Box */}
        <div style={{ background: '#fff', padding: '16px 20px', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>FILTERS</div>
            <div style={{ color: '#00b386', cursor: 'pointer', fontSize: 14 }} onClick={clearAll}>CLEAR ALL</div>
          </div>
        </div>

        {/* Filter Body Box */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>

          {/* AMC Filter */}
          <div style={{ marginBottom: 24 }}>
            <div
              onClick={() => toggleSection('amc')}
              style={{ fontWeight: 600, marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              AMC
              <span>{expanded.amc ? '▲' : '▼'}</span>
            </div>
            {expanded.amc && (
              <>
                <input
                  type="text"
                  placeholder="Search Mutual Fund Companies"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc', marginBottom: 8 }}
                />
                <div style={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 4, background: '#fff' }}>
                  {amcList.map(amc => (
                    <div key={amc}>
                      <label>
                        <input type="checkbox" checked={selectedAmcs.includes(amc)} onChange={() => handleAmcChange(amc)} /> {amc}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <div
              onClick={() => toggleSection('category')}
              style={{ fontWeight: 600, marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              Category
              <span>{expanded.category ? '▲' : '▼'}</span>
            </div>
            {expanded.category && (
              <div style={{ maxHeight: 150, overflowY: 'auto', border: '1px solid #eee', padding: 8, borderRadius: 4, background: '#fff' }}>
                {categoryList.map(cat => (
                  <div key={cat}>
                    <label>
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} /> {cat}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>All Mutual Funds</div>
        <div style={{ marginBottom: 16, color: '#666' }}>
          Search Results: <strong>{filteredFunds.length}</strong> Mutual Funds
        </div>

        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredFunds.map((fund, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                padding: 20,
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                gap: 16
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: 48,
                height: 48,
                background: '#f2f2f2',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span role="img" aria-label="fund" style={{ fontSize: 24 }}>📈</span>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{fund['Scheme Name']}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 12 }}>
                  <span style={{ background: '#ffe6e6', color: '#d32f2f', padding: '2px 6px', borderRadius: 6 }}>
                    Very High Risk
                  </span>
                  <span style={{ background: '#e0f2f1', color: '#00796b', padding: '2px 6px', borderRadius: 6 }}>
                    {fund['Scheme Category']}
                  </span>
                  <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '2px 6px', borderRadius: 6 }}>
                    {fund['Scheme Type']}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: 180, fontSize: 14 }}>
                <div>1Y: <strong>--%</strong></div>
                <div>3Y: <strong>--%</strong></div>
                <div>5Y: <strong>--%</strong></div>
              </div>
            </div>
          ))}
        </div> */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
    <thead>
      <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
        <th style={{ padding: 12 }}>Scheme Name</th>
        <th style={{ padding: 12 }}>Risk</th>
        <th style={{ padding: 12 }}>Category</th>
        <th style={{ padding: 12 }}>Type</th>
        <th style={{ padding: 12 }}>1Y</th>
        <th style={{ padding: 12 }}>3Y</th>
        <th style={{ padding: 12 }}>5Y</th>
      </tr>
    </thead>
    <tbody>
      {filteredFunds.map((fund, idx) => (
        <tr key={idx} style={{ borderBottom: '1px solid #eee', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
          <td style={{ padding: 12, fontWeight: 600 }}>{fund['Scheme Name']}</td>
          <td style={{ padding: 12, color: '#d32f2f' }}>Very High Risk</td>
          <td style={{ padding: 12 }}>{fund['Scheme Category']}</td>
          <td style={{ padding: 12 }}>{fund['Scheme Type']}</td>
          <td style={{ padding: 12 }}>--%</td>
          <td style={{ padding: 12 }}>--%</td>
          <td style={{ padding: 12 }}>--%</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default MutualFundExplorer;
