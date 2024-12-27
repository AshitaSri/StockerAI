import React, { useState } from 'react';
import './future.css';

const FutureAndOptionslAnalysis = () => {
  const [positions, setPositions] = useState([]);
  const [segment, setSegment] = useState('futures');
  const [index, setIndex] = useState('banknifty');
  const [optionType, setOptionType] = useState('call');
  const [actionType, setActionType] = useState('buy');
  const [strikePrice, setStrikePrice] = useState('ATM');
  const [totalLot, setTotalLot] = useState(1);
  const [expiryType, setExpiryType] = useState('weekly');
  const [stopLoss, setStopLoss] = useState('');
  const [target, setTarget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAddPosition = () => {
    const newPosition = {
      segment,
      index,
      optionType,
      actionType,
      strikePrice,
      totalLot,
      expiryType,
      stopLoss,
      target,
    };
    setPositions([...positions, newPosition]);
  };

  const handleDeletePosition = (index) => {
    setPositions(positions.filter((_, i) => i !== index));
  };

  const handleBacktest = async () => {
    try {
      const response = await fetch('/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ positions, startDate, endDate }),
      });
      const result = await response.json();
      console.log('Backtest result:', result);
    } catch (error) {
      console.error('Backtest error:', error);
    }
  };

  const generateStrikePriceOptions = () => {
    const options = ['ATM'];
    for (let i = 100; i <= 2000; i += 100) {
      options.push(`ATM+${i}`, `ATM-${i}`);
    }
    return options.sort((a, b) => {
      const getNum = str => str.includes('+') ? parseInt(str.split('+')[1]) : 
                          str.includes('-') ? -parseInt(str.split('-')[1]) : 0;
      return getNum(a) - getNum(b);
    });
  };

  return (
    <div className="trading-container">
      <div className="segment-selector">
        <button 
          className={`segment-button ${segment === 'futures' ? 'active' : ''}`} 
          onClick={() => setSegment('futures')}
        >
          Futures
        </button>
        <button 
          className={`segment-button ${segment === 'options' ? 'active' : ''}`} 
          onClick={() => setSegment('options')}
        >
          Options
        </button>
      </div>

      <div className="trading-form glass-card">
        <div className="form-row">
          <div className="form-group">
            <label>Index:</label>
            <select value={index} onChange={(e) => setIndex(e.target.value)}>
              <option value="banknifty">BankNifty</option>
              <option value="nifty">Nifty</option>
            </select>
          </div>

          {segment === 'options' && (
            <div className="form-group">
              <label>Option Type:</label>
              <div className="button-group">
                <button className={optionType === 'call' ? 'active' : ''} onClick={() => setOptionType('call')}>Call</button>
                <button className={optionType === 'put' ? 'active' : ''} onClick={() => setOptionType('put')}>Put</button>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Action Type:</label>
            <div className="button-group">
              <button className={actionType === 'buy' ? 'active' : ''} onClick={() => setActionType('buy')}>Buy</button>
              <button className={actionType === 'sell' ? 'active' : ''} onClick={() => setActionType('sell')}>Sell</button>
            </div>
          </div>

          {segment === 'options' && (
            <>
              <div className="form-group">
                <label>Strike Price:</label>
                <select value={strikePrice} onChange={(e) => setStrikePrice(e.target.value)}>
                  {generateStrikePriceOptions().map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Expiry Type:</label>
                <select value={expiryType} onChange={(e) => setExpiryType(e.target.value)}>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Total Lot:</label>
            <input type="number" value={totalLot} onChange={(e) => setTotalLot(Number(e.target.value))} min="1" />
          </div>

          <div className="form-group">
            <label>Stop Loss:</label>
            <input type="number" value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Target:</label>
            <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
          </div>
        </div>

        <button className="add-button" onClick={handleAddPosition}>Add Position</button>
      </div>

      <div className="positions-section glass-card">
        <h3>Positions</h3>
        {positions.length > 0 ? (
          <table className="positions-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Type</th>
                <th>Index</th>
                {segment === 'options' && <th>Strike</th>}
                <th>Lots</th>
                {segment === 'options' && <th>Expiry</th>}
                <th>SL/Target</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, idx) => (
                <tr key={idx}>
                  <td>{position.segment}</td>
                  <td>
                    <span className={`position-type ${position.actionType}`}>
                      {position.actionType.toUpperCase()} 
                      {position.segment === 'options' && ` ${position.optionType.toUpperCase()}`}
                    </span>
                  </td>
                  <td>{position.index}</td>
                  {segment === 'options' && <td>{position.strikePrice}</td>}
                  <td>{position.totalLot}</td>
                  {segment === 'options' && <td>{position.expiryType}</td>}
                  <td>{position.stopLoss || 'N/A'} / {position.target || 'N/A'}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeletePosition(idx)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No positions added yet.</p>
        )}
      </div>

      <div className="backtest-section">
        <div className="date-inputs">
          <div className="form-group">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <button className="backtest-button" onClick={handleBacktest}>Run Backtest</button>
      </div>
    </div>
  );
};

export default FutureAndOptionslAnalysis;