import React from 'react';
import SwitchBox from '../../ui/checkBoxElements/SwitchBox';

const TableSort = props => {
  const { allocationPercentFormat, onAllocationFormatUpdate } = props;

  return (
    <div className="row">
      <div className="column" />
      <div className="column">Ticker</div>
      <div className="column">Fund Name</div>
      <div className="column">
        <div>
          <div className="sort-text">Allocation</div>
          <SwitchBox
            isChecked={allocationPercentFormat}
            onChange={onAllocationFormatUpdate}
            textLabel={['$', '%']}
          />
        </div>
      </div>
      <div className="column">Credit Criteria</div>
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
