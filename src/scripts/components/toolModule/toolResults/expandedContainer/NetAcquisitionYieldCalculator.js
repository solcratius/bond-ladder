/* eslint-disable jsx-a11y/no-onchange */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  cleanNumber,
  numberFormat,
  percentFormat
} from '../../../helper/formatting';
import ValueInput from '../../../ui/inputFields/ValueInput';
import RectangularButton from '../../../ui/rectangularButton';
import ResetButton from '../../../ui/resetButton';

@inject('appStore')
@observer
class NetAcquisitionYieldCalculator extends Component {
  constructor() {
    super();

    this.userPricePlaceHolderText = 'Enter Share Purchase Price';

    this.state = {
      id: null,
      netAcquisitionYield: null,
      userPrice: this.userPricePlaceHolderText
    };
  }

  onTickerChangeHandler = event => {
    const { value } = event.target,
      trueVal = value <= 0 ? null : value - 1;

    this.setState({
      id: trueVal,
      userPrice: this.userPricePlaceHolderText
    });
  };

  priceUpdateDone = value => {
    this.setState({
      userPrice: numberFormat(value, '$')
    });
  };

  calculate = () => {
    const { id, userPrice } = this.state;
    if (userPrice === this.userPricePlaceHolderText) return;

    const { selectedProducts } = this.props.appStore.Product,
      selectedProduct = selectedProducts[id],
      priceAdjustment =
        ((cleanNumber(selectedProduct.nav) - cleanNumber(userPrice)) /
          (cleanNumber(selectedProduct.nav) *
            cleanNumber(selectedProduct.effectiveDuration))) *
        100;

    this.setState({
      netAcquisitionYield: {
        priceAdjustment,
        value:
          selectedProduct.yieldToWorst +
          priceAdjustment -
          this.getExpenseRatio(selectedProduct.ticker)
      }
    });
  };

  getExpenseRatio = ticker => {
    const { totalExpenseRatio } = this.props.appStore.Common;
    return totalExpenseRatio[ticker];
  };

  resetCalculator = () => {
    this.setState({
      id: null,
      netAcquisitionYield: null,
      userPrice: this.userPricePlaceHolderText
    });
  };

  render() {
    const { id, netAcquisitionYield, userPrice } = this.state,
      { selectedProducts } = this.props.appStore.Product,
      productList = selectedProducts.map((product, i) => {
        return (
          <option key={i + 1} value={i + 1}>
            {product.ticker || null}
          </option>
        );
      }),
      selectedProduct = selectedProducts[id] || null,
      inputContent =
        id === null ? null : (
          <div className="content">
            <span className="nav">
              <h6>NAV</h6>
              <span className="date"> as of {selectedProduct.asOfDate}</span>
              {numberFormat(selectedProduct.nav, '$')}
            </span>

            <ValueInput
              className="share-purchase-price"
              onUpdateDone={this.priceUpdateDone}
              value={userPrice}
            />
            <RectangularButton
              className={
                userPrice === this.userPricePlaceHolderText ? 'disabled' : ''
              }
              onClick={this.calculate}
            >
              Calculate
            </RectangularButton>
          </div>
        ),
      resultContent =
        netAcquisitionYield === null ? null : (
          <div className="output-module">
            <h4>{`Fund: ${selectedProduct.ticker} - ${
              selectedProduct.fundName
            }`}</h4>
            <ResetButton
              className="reset-calculator"
              icon="icon-loop"
              onClick={this.resetCalculator}
            >
              Reset
            </ResetButton>
            <div className="results">
              <div className="row bottom-divider">
                <span>Net Asset Value (NAV)</span>
                <span>{numberFormat(selectedProduct.nav, '$')}</span>
              </div>
              <div className="row">
                <span>
                  Weighted Average Yield to Worst<sup>1</sup> (YTW)
                </span>
                <span>{percentFormat(selectedProduct.yieldToWorst)}</span>
              </div>
              <div className="row bottom-divider">
                <span>
                  + Price Adjustment<sup>2</sup>
                </span>
                <span>
                  {percentFormat(netAcquisitionYield.priceAdjustment)}
                </span>
              </div>
              <div className="row">
                <span>
                  = Price Adjusted Weighted Average Yield to Worst<sup>3</sup>
                </span>
                <span>
                  {percentFormat(
                    selectedProduct.yieldToWorst +
                      netAcquisitionYield.priceAdjustment
                  )}
                </span>
              </div>
              <div className="row bottom-divider">
                <span>- Expense Ratio</span>
                <span>
                  -{percentFormat(this.getExpenseRatio(selectedProduct.ticker))}
                </span>
              </div>
              <div className="row">
                <span>
                  <strong>
                    Estimated Net Acquisition Yield<sup>4</sup>
                  </strong>
                </span>
                <span>
                  <strong>{percentFormat(netAcquisitionYield.value)}</strong>
                </span>
              </div>
            </div>
          </div>
        );

    return (
      <div className="net-acquisition-yield-calculator">
        <div className="input-module">
          <select name="ticker" onChange={this.onTickerChangeHandler}>
            <option key="0" value={0}>
              Select a fund
            </option>
            {productList}
          </select>
          {inputContent}
        </div>
        {resultContent}
      </div>
    );
  }
}

export default NetAcquisitionYieldCalculator;
