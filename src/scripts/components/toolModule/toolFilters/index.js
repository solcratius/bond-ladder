import './style.scss';
import React from 'react';
import { inject, observer } from 'mobx-react';

import CreditCriteriaSelector from './CreditCriteriaSelector';
import RangeSlider from '../../ui/rangeSlider';
import SwitchButton from '../../ui/checkBoxElements/SwitchButton';
import SwitchBox from '../../ui/checkBoxElements/SwitchBox';

const ToolFilters = inject('appStore')(
  observer(props => {
    const { appStore, asOfDate, intro, reset, years } = props,
      {
        allocationEqualWeight,
        updateAllocationEqualWeight,
        updateCurrentYears,
        allocationPercentFormat,
        updateAllocationPercentFormat
      } = appStore.Tool,
      allocationWeightClicked = () => {
        updateAllocationEqualWeight(!allocationEqualWeight);
      },
      setNewYears = (startYear, Duration) => {
        const startVal = startYear || years[0],
          newYears = years.filter(
            year => year >= startVal && year < startVal + Duration
          );

        updateCurrentYears(newYears);
      },
      onAllocationFormatUpdate = () => {
        updateAllocationPercentFormat(!allocationPercentFormat);
      };

    return (
      <div>
        <div className="grid-x">
          <CreditCriteriaSelector />
          <RangeSlider
            intro={intro}
            reset={reset}
            setNewYears={setNewYears}
            years={years}
          />
        </div>
        <div className="flex-grid">
          <div className="column">
            <p>Equal Weight Distribution</p>
            <SwitchButton
              isChecked={allocationEqualWeight}
              onChange={allocationWeightClicked}
              // textLabel={['On', 'Off']}
            />
          </div>
          <div className="column">
            <p>U.S. Dollar / Percentage</p>
            <SwitchBox
              isChecked={allocationPercentFormat}
              onChange={onAllocationFormatUpdate}
              textLabel={['$', '%']}
            />
          </div>
          <div className="column">
            <p className="small-text">Data as of {asOfDate}</p>
          </div>
        </div>
      </div>
    );
  })
);

export default ToolFilters;
