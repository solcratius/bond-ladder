import React, { Component } from 'react';
import { Link } from '@reach/router';
import ValueInput from '../../../ui/inputFields/ValueInput';
import {
  cleanNumber,
  numberFormat,
  percentFormat
} from '../../../helper/formatting';
import Common from '../../../../models/CommonStore';

class TableResultsRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: props.product.nav,
      netAcquisitionYield: '-',
      priceAdjustment: '-'
    };
  }

  componentDidMount() {
    this.calculate();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.product !== this.props.product) {
      this.calculate();
    }
  }

  onPriceChange = value => {
    console.log(value);

    this.setState(
      {
        price: value
      },
      () => {
        this.calculate();
      }
    );
  };

  calculate = () => {
    const { price } = this.state,
      {
        allocation,
        effectiveDuration,
        nav,
        ticker,
        yieldToWorst
      } = this.props.product,
      priceAdjustment =
        ((cleanNumber(nav) - cleanNumber(price)) /
          (cleanNumber(nav) * cleanNumber(effectiveDuration))) *
        100,
      finalValue =
        yieldToWorst + priceAdjustment - this.getExpenseRatio(ticker);

    this.setState(
      {
        netAcquisitionYield: percentFormat(finalValue),
        priceAdjustment: percentFormat(priceAdjustment)
      },
      () => {
        this.props.totalValue(
          finalValue * (allocation / this.props.investment),
          this.props.id
        );
      }
    );
  };

  getExpenseRatio = ticker => {
    const { totalExpenseRatio } = Common;
    return totalExpenseRatio[ticker];
  };

  render() {
    const { product } = this.props,
      // { ticker, url, name, maturityDate, nav, yieldToWorst } = product,
      { ticker, url, name, nav, yieldToWorst } = product,
      { price, netAcquisitionYield, priceAdjustment } = this.state,
      formattedExpenseRatio = this.getExpenseRatio(ticker);

    return (
      <div className="result-row">
        <div className="column">
          <Link to={url}>{ticker}</Link>
        </div>
        <div className="column">
          <Link to={url}>{name}</Link>
        </div>
        {/* <div className="column">{maturityDate}</div> */}
        <div className="column">{numberFormat(nav)}</div>
        <div className="column price">
          <ValueInput
            onUpdateDone={this.onPriceChange}
            value={numberFormat(price)}
          />
          <span className="usd-option">$</span>
        </div>
        <div className="column">{percentFormat(yieldToWorst)}</div>
        <div className="column">{priceAdjustment}</div>
        <div className="column">
          {typeof formattedExpenseRatio !== 'number'
            ? '-'
            : percentFormat(formattedExpenseRatio)}
        </div>
        <div className="column">{netAcquisitionYield}</div>
      </div>
    );
  }
}

export default TableResultsRow;
