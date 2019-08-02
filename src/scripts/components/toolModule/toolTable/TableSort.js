import React from 'react';

const TableSort = () => {
  return (
    <div className="row">
      <div className="column">
        <div className="column-item" />
        <div className="column-item">Ticker</div>
        <div className="column-item">Fund Name</div>
        <div className="column-item">Allocation</div>
      </div>
      {/* <div className="column">Credit Criteria</div> */}
      <div className="column">Maturity Year</div>
      <div className="column">Yield to Maturity (%)</div>
      <div className="column">Yield to Worst (%)</div>
      <div className="column">Effective Duration (yrs)</div>
      <div className="column">30-Day SEC Yield (%)</div>
      <div className="column">Distribution Rate (%)</div>
      <div className="column"># of Holdings</div>
    </div>
  );
};

export default TableSort;
