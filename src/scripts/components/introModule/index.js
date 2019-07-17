import './style.scss';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { numberFormat } from '../helper/formatting';
import NameInput from '../ui/inputFields/NameInput';
import ValueInput from '../ui/inputFields/ValueInput';
import RectangularButton from '../ui/rectangularButton';

const IntroMoldule = inject('appStore')(
  observer(props => {
    const {
        investment,
        ladderName,
        updateInvestment,
        updateLadderName
      } = props.appStore.User,
      { updateProductAllocation } = props.appStore.Tool,
      onNameUpdate = value => {
        updateLadderName(value);
      },
      onValueUpdate = value => {
        updateInvestment(value);
        updateProductAllocation();
      },
      onStartClick = event => {
        const code = event.keyCode || event.which;
        if (code && code !== 13) return;

        event.preventDefault();

        if (investment !== '') {
          if (ladderName === '') updateLadderName('My bond ladder');
          props.onStartClick(true);
        }
      };

    return (
      <section className="intro-module grid-container">
        <div className="container">
          <div className="intro-title">
            <h2>
              BulletShares<sup>®</sup> ETF <br />
              Bond Ladder Tool
            </h2>
            {/* <img src="images/fpo-chart0.gif" alt="" /> */}
            <p>
              Build a hypothetical BulletShares Ladder, based on maturity,
              geography, and credit criteria, using the BulletShares ETF Bond
              Ladder Tool.
            </p>
          </div>
          <div className="intro-content">
            <div className="module">
              <span className="eyebrow">Name your ladder</span>
              <NameInput
                className="editLadderName"
                name="ladderName"
                onUpdateDone={onNameUpdate}
                placeHolder="E.g. My bond ladder"
                value={ladderName}
              />
            </div>

            <div className="module">
              <span className="eyebrow">Investment amount</span>
              <ValueInput
                name="investment"
                onUpdateDone={onValueUpdate}
                value={numberFormat(investment, '$')}
              />
            </div>

            <RectangularButton onClick={onStartClick}>
              Build my ladder
            </RectangularButton>
          </div>
        </div>
      </section>
    );
  })
);

export default IntroMoldule;
