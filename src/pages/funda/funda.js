import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Filter, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
import './funda.css';

const FundamentalAnalysis = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    peRatio: { min: '', max: '' },
    pbRatio: { min: '', max: '' },
    earningsYield: { min: '', max: '' },
    revenueGrowth: { min: '', max: '' },
    epsGrowth: { min: '', max: '' },
    roe: { min: '', max: '' },
    dividendYield: { min: '', max: '' },
    payoutRatio: { min: '', max: '' },
    debtEquity: { min: '', max: '' },
    beta: { min: '', max: '' },
    marketCap: [],
    sectors: []
  });

  // Mock data for demonstration
  const sampleStockData = {
    price: 150.25,
    marketCap: '2.5T',
    dividendYield: '0.65%',
    weekHigh: 175.30,
    weekLow: 124.17,
    pe: 28.5,
    eps: 5.27,
    revenueGrowth: '15.4%',
    debtEquity: 1.2,
    roe: '35.8%'
  };

  const historicalData = [
    { date: '2023-01', value: 130 },
    { date: '2023-02', value: 145 },
    { date: '2023-03', value: 140 },
    { date: '2023-04', value: 155 },
    { date: '2023-05', value: 150 },
    { date: '2023-06', value: 160 }
  ];

  const presetFilters = [
    {
      name: 'Undervalued Stocks',
      description: 'Low P/E, high ROE',
      icon: <DollarSign size={20} />
    },
    {
      name: 'High-Growth Stocks',
      description: 'High revenue and EPS growth',
      icon: <TrendingUp size={20} />
    },
    {
      name: 'Top Dividend Payers',
      description: 'High yield, sustainable payout',
      icon: <BarChart2 size={20} />
    }
  ];

  const handleSearch = () => {
    // Implement stock search logic
    console.log('Searching for:', searchQuery);
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const applyFilters = () => {
    // Implement filter logic
    console.log('Applying filters:', filters);
  };

  return (
    <div className="fundamental-analysis">
      {/* Top Navigation */}
      <div className="analysis-nav">
        <button
          className={`nav-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <Search size={20} />
          Stock Search
        </button>
        <button
          className={`nav-button ${activeTab === 'screener' ? 'active' : ''}`}
          onClick={() => setActiveTab('screener')}
        >
          <Filter size={20} />
          Stock Screener
        </button>
      </div>

      {/* Search Section */}
      {activeTab === 'search' && (
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter stock name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {searchQuery && (
            <div className="stock-analysis">
              {/* Stock Overview Card */}
              <div className="analysis-card overview-card">
                <h3>Stock Overview</h3>
                <div className="metrics-grid">
                  <div className="metric">
                    <span className="label">Current Price</span>
                    <span className="value">${sampleStockData.price}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Market Cap</span>
                    <span className="value">{sampleStockData.marketCap}</span>
                  </div>
                  <div className="metric">
                    <span className="label">52W High</span>
                    <span className="value">${sampleStockData.weekHigh}</span>
                  </div>
                  <div className="metric">
                    <span className="label">52W Low</span>
                    <span className="value">${sampleStockData.weekLow}</span>
                  </div>
                </div>
              </div>

              {/* Financial Metrics Card */}
              <div className="analysis-card metrics-card">
                <h3>Key Financial Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric">
                    <span className="label">P/E Ratio</span>
                    <span className="value">{sampleStockData.pe}</span>
                  </div>
                  <div className="metric">
                    <span className="label">EPS</span>
                    <span className="value">${sampleStockData.eps}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Revenue Growth</span>
                    <span className="value">{sampleStockData.revenueGrowth}</span>
                  </div>
                  <div className="metric">
                    <span className="label">ROE</span>
                    <span className="value">{sampleStockData.roe}</span>
                  </div>
                </div>
              </div>

              {/* Price Chart */}
              <div className="analysis-card chart-card">
                <h3>Price History</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="var(--color-primary-500)" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Screener Section */}
      {activeTab === 'screener' && (
        <div className="screener-section">
          {/* Preset Filters */}
          <div className="preset-filters">
            <h3>Quick Filters</h3>
            <div className="preset-buttons">
              {presetFilters.map((preset, index) => (
                <button key={index} className="preset-button">
                  {preset.icon}
                  <div>
                    <span>{preset.name}</span>
                    <small>{preset.description}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Filters */}
          <div className="filter-section">
            <h3>Custom Filters</h3>
            <div className="filter-grid">
              {/* Valuation Filters */}
              <div className="filter-group">
                <h4>Valuation</h4>
                <div className="filter-input">
                  <label>P/E Ratio</label>
                  <div className="range-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.peRatio.min}
                      onChange={(e) => handleFilterChange('peRatio', { ...filters.peRatio, min: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.peRatio.max}
                      onChange={(e) => handleFilterChange('peRatio', { ...filters.peRatio, max: e.target.value })}
                    />
                  </div>
                </div>
                {/* Add more valuation filters similarly */}
              </div>

              {/* Growth Filters */}
              <div className="filter-group">
                <h4>Growth</h4>
                <div className="filter-input">
                  <label>Revenue Growth (%)</label>
                  <div className="range-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.revenueGrowth.min}
                      onChange={(e) => handleFilterChange('revenueGrowth', { ...filters.revenueGrowth, min: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.revenueGrowth.max}
                      onChange={(e) => handleFilterChange('revenueGrowth', { ...filters.revenueGrowth, max: e.target.value })}
                    />
                  </div>
                </div>
                {/* Add more growth filters similarly */}
              </div>

              {/* Add more filter groups */}
            </div>

            <button className="apply-filters-button" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundamentalAnalysis;