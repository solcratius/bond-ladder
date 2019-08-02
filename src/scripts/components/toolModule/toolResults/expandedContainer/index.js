import './style.scss';
import React, { Component } from 'react';
import RectangularButton from '../../../ui/rectangularButton';
import CreditQualityDonutChart from './CreditQualityDonutChartStateful';
import TableResultsRow from './TableResultsRow';

import {
  cleanNumber,
  numberFormat,
  percentFormat
} from '../../../helper/formatting';

const sortRowsText = [
  'Ticker',
  'Fund Name',
  // 'Maturity Year',
  'Net Asset Value',
  'Purchase Price',
  'Weighted Average Yield to Worst',
  'Price Adjustment',
  'Expense Ratio',
  'Estimated Net Acquisition Yield'
];

class ExpandedContainer extends Component {
  constructor() {
    super();

    this.state = {
      totalAcquisitionYield: 0
    };

    this.calculatedAcquisitionYield = [];
  }

  componentDidUpdate(prevProp) {
    const { currentProducts } = this.props;
    if (prevProp.currentProducts !== currentProducts) {
      const totalFundAmount = currentProducts.filter(
        key => key.selected && key.show
      ).length;

      this.calculatedAcquisitionYield = new Array(totalFundAmount);
    }
  }

  getTotalAcquisitionYield = (value, id) => {
    this.calculatedAcquisitionYield[id] = value;

    this.setState({
      totalAcquisitionYield: this.calculatedAcquisitionYield.reduce(
        (a, b) => a + b
      )
    });
  };

  generatePDF = () => {
    // eslint-disable-next-line no-alert
    alert('PDF coming soon');
  };

  render() {
    const {
        appState,
        currentProducts,
        investment,
        ladderName,
        resultsValue,
        yearRange
      } = this.props,
      valueRows = currentProducts.map((key, i) => {
        return key.selected && key.show ? (
          <TableResultsRow
            key={i}
            id={i}
            product={key}
            investment={investment}
            totalValue={this.getTotalAcquisitionYield}
          >
            {key.name}
          </TableResultsRow>
        ) : null;
      }),
      sortRows = sortRowsText.map((text, i) => {
        return (
          <div key={i} className={`column${i === 3 ? ' price' : ''}`}>
            {text}
          </div>
        );
      });

    return (
      <div className="expanded-container">
        <div className="result-section">
          <div className="grid-container">
            <div className="flex-row result-top">
              <div className="column">
                <h3>{ladderName}</h3>
              </div>
              <div className="column">
                <RectangularButton onClick={this.generatePDF}>
                  Download Report
                </RectangularButton>
              </div>
            </div>
            <div className="flex-row result-content">
              <div className="column">
                Investment Amount
                <div className="value">{numberFormat(investment, '$')}</div>
              </div>
              <div className="column">
                Maturity Duration<div className="value">{yearRange}</div>
              </div>
              <div className="column">
                Yield To Maturity
                <div className="value">{resultsValue[1]}</div>
              </div>
              <div className="column">
                Yield To Worst
                <div className="value">{resultsValue[2]}</div>
              </div>
              <div className="column">
                Effective Duration
                <div className="value">
                  <span>
                    {`${resultsValue[3]} year${
                      cleanNumber(resultsValue[3]) !== 1 ? 's' : ''
                    }`}
                  </span>
                </div>
              </div>
              <div className="column">
                30-day SEC Yield
                <div className="value">{resultsValue[4]}</div>
              </div>
              <div className="column">
                Distribution Rate
                <div className="value">{resultsValue[5]}</div>
              </div>
              <div className="column">
                Holdings(#)
                <div className="value">{resultsValue[6]}</div>
              </div>
            </div>
            <div className="result-chart">
              <CreditQualityDonutChart
                appState={appState}
                products={currentProducts}
              />
              <p className="as-of-date small-text">
                Data as of {this.props.asOfDate}
              </p>
            </div>
          </div>
        </div>
        <div className="calculator-section">
          <div className="grid-container">
            <h4>Estimated Net Acquisition Yield</h4>
            <div className="table-result-sort">
              <div className="result-row">{sortRows}</div>
            </div>
            <div className="table-result-value">{valueRows}</div>
            <div className="total-output">
              <span>Total Estimated Net Acquisition Yield:</span>
              <div className="value">
                {percentFormat(this.state.totalAcquisitionYield)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpandedContainer;
