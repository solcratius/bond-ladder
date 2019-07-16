import React from 'react';
import SwitchBox from '../../ui/checkBoxElements/SwitchBox';

const TableSort = props => {
  const { allocationPercentFormat, onAllocationFormatUpdate } = props;

  return (
    <div className="grid-x">
      <div className="cell" />
      <div className="cell col-1">Ticker</div>
      <div className="cell col-2">
        <div>
          <div className="sort-text">Allocation</div>
          <SwitchBox
            isChecked={allocationPercentFormat}
            onChange={onAllocationFormatUpdate}
            textLabel={['$', '%']}
          />
        </div>
      </div>
      <div className="cell col-2">Credit Criteria</div>
      <div className="cell col-1">Maturity Date</div>
      <div className="cell col-1">Yield to Maturity (%)</div>
      <div className="cell col-1">Yield to Worst (%)</div>
      <div className="cell col-1">Effective Duration (yrs)</div>
      <div className="cell col-1">30-Day SEC Yield (%)</div>
      <div className="cell col-1">Distribution Rate (%)</div>
      <div className="cell col-1"># of Holdings</div>
    </div>
  );
};

export default TableSort;
