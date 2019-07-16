import './style.scss';
import React from 'react';
import { inject, observer } from 'mobx-react';

import { numberFormat } from '../../helper/formatting';

import NameInput from '../../ui/inputFields/NameInput';
import ValueInput from '../../ui/inputFields/ValueInput';
import CircularButton from '../../ui/circularButton';

const ToolProfile = inject('appStore')(
  observer(props => {
    const {
        appState,
        allocationEqualWeight,
        // allocationPercentFormat,
        updateAllocationEqualWeight,
        updateProductAllocation
      } = props.appStore.Tool,
      {
        ladderName,
        investment,
        updateLadderName,
        updateInvestment
      } = props.appStore.User,
      onNameUpdate = value => {
        updateLadderName(value);
      },
      onValueUpdate = value => {
        // console.log(`investmentVal:${value}`);
        updateInvestment(value);

        if (!allocationEqualWeight) {
          updateAllocationEqualWeight(true);
        }

        updateProductAllocation();
      },
      investmentAmount = numberFormat(investment, '$');

    return (
      <div className="sub-head">
        <div className="grid-container">
          <div className="grid-x">
            <div className="cell medium-6 ladder-name">
              <span className="eyebrow">Ladder Name</span>
              <NameInput
                appState={appState}
                className="editLadderName"
                flexibleInput
                name="ladderName"
                onUpdateDone={onNameUpdate}
                value={ladderName}
              />
            </div>
            <div className="cell medium-4 investment-input">
              <div>
                <span className="eyebrow">Investment Amount</span>
                <ValueInput
                  appState={appState}
                  flexibleInput
                  name="investment"
                  onUpdateDone={onValueUpdate}
                  value={investmentAmount}
                />
              </div>
            </div>
            <div className="cell medium-2 download-report">
              <CircularButton className="icon-download">
                Download Report
              </CircularButton>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default ToolProfile;
