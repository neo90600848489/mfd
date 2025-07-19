import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import MutualFundDetailsScreen from './mutualfunds/mutualfund/MutualFundDetailsScreen';
import AMCDetailsPage from './mutualfunds/mutualfund/AMCDetailsPage';
import MutualFundExplorer from './mutualfunds/mutualfund/MutualFundExplorer';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/mutual-fund" element={<MutualFundExplorer />} />
        <Route path="/" element={<MutualFundDetailsScreen />} />
        <Route path="/amc/:amcName" element={<AMCDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
