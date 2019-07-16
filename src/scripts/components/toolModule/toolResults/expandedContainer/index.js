import './style.scss';
import React from 'react';
import RectangularButton from '../../../ui/rectangularButton';
import CreditQualityColumnChart from './CreditQualityColumnChart';
import NetAcquisitionYieldCalculator from './NetAcquisitionYieldCalculator';

const ExpandedContainer = () => {
  return (
    <div className="expanded-container">
      <div className="grid-container">
        <CreditQualityColumnChart />
        {/* <img src="images/fpo-chart1.gif" alt="" />
    <div className="fpo-content" /> */}
        <NetAcquisitionYieldCalculator />
        <RectangularButton className="icon-download rounded-corners">
          Download Report
        </RectangularButton>
      </div>
    </div>
  );
};

export default ExpandedContainer;
