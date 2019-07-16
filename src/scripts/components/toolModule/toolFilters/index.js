import './style.scss';
import React from 'react';
import { inject, observer } from 'mobx-react';

import CreditCriteriaSelector from './CreditCriteriaSelector';
import RangeSlider from '../../ui/rangeSlider';
import SwitchButton from '../../ui/checkBoxElements/SwitchButton';

const ToolFilters = inject('appStore')(
  observer(props => {
    const { appStore, asOfDate, intro, reset, years } = props,
      {
        allocationEqualWeight,
        updateAllocationEqualWeight,
        updateCurrentYears
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
        <div className="grid-x">
          <div className="cell medium-6 allocation-option">
            <p>Distribute your portfolio allocation by equal weight</p>
            <SwitchButton
              isChecked={allocationEqualWeight}
              onChange={allocationWeightClicked}
              textLabel={['On', 'Off']}
            />
          </div>
          <div className="cell medium-6 as-of-date">
            <p className="small-text">Data as of {asOfDate}</p>
          </div>
        </div>
      </div>
    );
  })
);

export default ToolFilters;
