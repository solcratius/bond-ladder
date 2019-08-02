import './style.scss';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { animateScroll } from 'react-scroll';
import { numberFormat } from '../../helper/formatting';

import NameInput from '../../ui/inputFields/NameInput';
import ValueInput from '../../ui/inputFields/ValueInput';
import CircularButton from '../../ui/circularButton';
// import RectangularButton from '../../ui/rectangularButton';

const ToolProfile = inject('appStore')(
  observer(props => {
    const {
        appState,
        allocationEqualWeight,
        // allocationPercentFormat,
        // downloadState,
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
      investmentAmount = numberFormat(investment, '$'),
      // generatePDF = () => {
      //   // eslint-disable-next-line no-alert
      //   alert('PDF coming soon');
      // };
      anchorToResult = () => {
        // animateScroll.scrollTo(this.props.tableBottomY + 93);
        animateScroll.scrollTo(props.tableBottomY + 181);
        // animateScroll.scrollTo(this.props.tableBottomY);
      };

    return (
      <div className="sub-head">
        <div className="grid-container">
          <div className="ladder-name">
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
          <div className="investment-input">
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
          <div className="download-report">
            <CircularButton
              // inActive={!downloadState}
              className="icon-arrowdown"
              onClick={anchorToResult}
            >
              View My Report
            </CircularButton>
            {/* <RectangularButton
              className={`mint${!downloadState ? ' inactive' : ''}`}
              onClick={generatePDF}
            >
              Download Report
            </RectangularButton> */}
          </div>
        </div>
      </div>
    );
  })
);

export default ToolProfile;
