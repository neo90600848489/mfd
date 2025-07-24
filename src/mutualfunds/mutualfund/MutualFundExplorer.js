import React, { useState } from 'react';
import mutualFunds from '../mutualfundData/mutualfundsplitted.json';

const getUnique = (arr, key) => [...new Set(arr.map(item => item[key]))].filter(Boolean);

const MutualFundExplorer = () => {
  const [selectedAmcs, setSelectedAmcs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({ amc: true, category: true });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Action dropdown state
  const [openDropdown, setOpenDropdown] = useState(null);

  const amcList = getUnique(mutualFunds, 'AMC');
  const categoryList = getUnique(mutualFunds, 'Scheme Category');

  const filteredFunds = mutualFunds.filter(fund => {
    const amcMatch = selectedAmcs.length === 0 || selectedAmcs.includes(fund.AMC);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(fund['Scheme Category']);
    const searchMatch = search === '' || fund['Scheme Name'].toLowerCase().includes(search.toLowerCase());
    return amcMatch && categoryMatch && searchMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredFunds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFunds = filteredFunds.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedAmcs, selectedCategories, search]);

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

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handleActionClick = (fundIndex) => {
    setOpenDropdown(openDropdown === fundIndex ? null : fundIndex);
  };

  const handleBuy = (fund) => {
    console.log('Buy action for:', fund['Scheme Name']);
    setOpenDropdown(null);
    // Add your buy logic here
  };

  const handleShowInterest = (fund) => {
    console.log('Show Interest action for:', fund['Scheme Name']);
    setOpenDropdown(null);
    // Add your show interest logic here
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    
    if (openDropdown !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

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

        {/* Table */}
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f0f0f0', textAlign: 'center' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Scheme Name</th>
                <th style={{ padding: 12 }}>Risk</th>
                <th style={{ padding: 12 }}>Category</th>
                <th style={{ padding: 12 }}>1Y</th>
                <th style={{ padding: 12 }}>3Y</th>
                <th style={{ padding: 12 }}>5Y</th>
                <th style={{ padding: 12 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFunds.map((fund, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <td style={{ padding: 12, fontWeight: 600 }}>{fund['Scheme Name']}</td>
                  <td style={{ padding: 12, color: '#d32f2f', textAlign: 'center' }}>Very High Risk</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{fund['Scheme Category']}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{fund['csv_returnM12'] ? fund['csv_returnM12'] : '---'}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{fund['csv_returnM36'] ? fund['csv_returnM36'] : '---'}</td>
                  <td style={{ padding: 12, textAlign: 'center' }}>{fund['csv_returnM60'] ? fund['csv_returnM60'] : '---'}</td>
                  <td style={{ padding: 12, textAlign: 'center', position: 'relative' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(idx);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: 4,
                        color: '#00b386',
                        fontSize: 16,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f8f5'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      title="Actions"
                    >
                      ✏️
                    </button>
                    
                    {openDropdown === idx && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          background: '#fff',
                          border: '1px solid #ddd',
                          borderRadius: 6,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          zIndex: 1000,
                          minWidth: 140,
                          overflow: 'hidden'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleBuy(fund)}
                          style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: 'none',
                            background: '#fff',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: 14,
                            color: '#333',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        >
                          💰 Buy
                        </button>
                        <div style={{ height: 1, background: '#eee' }}></div>
                        <button
                          onClick={() => handleShowInterest(fund)}
                          style={{
                            width: '100%',
                            padding: '10px 16px',
                            border: 'none',
                            background: '#fff',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: 14,
                            color: '#333',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        >
                          ❤️ Show Interest
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: 20, 
              paddingTop: 20, 
              borderTop: '1px solid #eee' 
            }}>
              {/* Results info */}
              <div style={{ fontSize: 14, color: '#666' }}>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredFunds.length)} of {filteredFunds.length} entries
              </div>

              {/* Pagination controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Items per page selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16 }}>
                  <span style={{ fontSize: 14, color: '#666' }}>Show</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={e => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    style={{ 
                      padding: '4px 8px', 
                      border: '1px solid #ccc', 
                      borderRadius: 4,
                      fontSize: 14
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span style={{ fontSize: 14, color: '#666' }}>per page</span>
                </div>

                {/* First page */}
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    background: currentPage === 1 ? '#f5f5f5' : '#fff',
                    borderRadius: 4,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    color: currentPage === 1 ? '#999' : '#333'
                  }}
                >
                  First
                </button>

                {/* Previous page */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    background: currentPage === 1 ? '#f5f5f5' : '#fff',
                    borderRadius: 4,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    color: currentPage === 1 ? '#999' : '#333'
                  }}
                >
                  ← Prev
                </button>

                {/* Page numbers */}
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #ddd',
                      background: page === currentPage ? '#00b386' : '#fff',
                      color: page === currentPage ? '#fff' : '#333',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: page === currentPage ? 'bold' : 'normal'
                    }}
                  >
                    {page}
                  </button>
                ))}

                {/* Next page */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    background: currentPage === totalPages ? '#f5f5f5' : '#fff',
                    borderRadius: 4,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    color: currentPage === totalPages ? '#999' : '#333'
                  }}
                >
                  Next →
                </button>

                {/* Last page */}
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    background: currentPage === totalPages ? '#f5f5f5' : '#fff',
                    borderRadius: 4,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    color: currentPage === totalPages ? '#999' : '#333'
                  }}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MutualFundExplorer;