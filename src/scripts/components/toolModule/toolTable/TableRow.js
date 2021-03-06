import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from '@reach/router';
import ValueInput from '../../ui/inputFields/ValueInput';
import CheckBox from '../../ui/checkBoxElements/CheckBox';
import {
  cleanNumber,
  numberFormat,
  percentFormat
} from '../../helper/formatting';

@inject('appStore')
@observer
class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allocation: props.product.allocation,
      selected: props.product.selected,
      show: props.product.show
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      const { allocation, selected, show } = this.props.product;

      this.setState({
        allocation,
        selected,
        show
      });
    }
  }

  onProductSelectUpdate = () => {
    const mySelect = !this.state.selected;
    this.setState(
      {
        selected: mySelect
      },
      () => {
        this.props.appStore.Tool.updateProductSelect(this.props.id, mySelect);
      }
    );
  };

  onAllocationChange = value => {
    const { updateProductAllocation } = this.props.appStore.Tool,
      {
        allocationPercentFormat,
        updateAllocationEqualWeight
      } = this.props.appStore.Tool,
      { investment } = this.props.appStore.User,
      myVal = allocationPercentFormat ? investment * (value * 0.01) : value;

    // console.log(`value:${value} investment::${investment} myVal:${myVal}`);

    if (myVal !== this.state.allocation) {
      updateAllocationEqualWeight(false);
    }

    this.setState(
      {
        allocation: myVal
      },
      () => {
        updateProductAllocation(this.props.id, cleanNumber(myVal));
      }
    );
  };

  formatValue = value => {
    const { allocationPercentFormat } = this.props.appStore.Tool,
      { investment } = this.props.appStore.User;
    // console.log(value);
    // console.log(
    //   `investment:${investment}, calculation:${numberFormat(
    //     value * 0.01 * cleanNumber(investment)
    //   )}`
    // );
    return allocationPercentFormat
      ? percentFormat((value / investment) * 100)
      : numberFormat(value);
  };

  render() {
    const { allocationPercentFormat, product } = this.props,
      {
        ticker,
        url,
        name,
        // criteria,
        maturityDate,
        yieldToMaturity,
        yieldToWorst,
        effectiveDuration,
        monthSecYield,
        distributionRate,
        numberOfHoldings
      } = product,
      { selected, allocation, show } = this.state;

    // console.log(`allocation: ${allocation}`);
    // console.log(`investment: ${this.props.appStore.User.investment}`);

    return (
      <div className={`row${selected ? '' : ' faded'}${show ? '' : ' hide'}`}>
        <div className="column">
          <div className="column-item">
            <CheckBox
              id="0"
              isChecked={selected}
              name="productSelect"
              onChange={this.onProductSelectUpdate}
            />
          </div>
          <div className="column-item">
            <Link to={url}>{ticker}</Link>
          </div>
          <div className="column-item">
            <Link to={url}>{name}</Link>
          </div>
          <div className="column-item">
            <span className="mobile-sort">Allocation</span>
            <div
              className={`allocation-field${
                !allocationPercentFormat ? ' usd' : ''
              }`}
            >
              <ValueInput
                onUpdateDone={this.onAllocationChange}
                value={this.formatValue(allocation)}
              />
              <span className="usd-option">$</span>
            </div>
          </div>
        </div>
        {/* <div className="column">{criteria}</div> */}
        <div className="column">
          <span className="mobile-sort">Maturity Year</span>
          {maturityDate}
        </div>
        <div className="column">
          <span className="mobile-sort">Yield to Maturity</span>
          {numberFormat(yieldToMaturity)}
        </div>
        <div className="column">
          <span className="mobile-sort">Yield to Worst</span>
          {numberFormat(yieldToWorst)}
        </div>
        <div className="column">
          <span className="mobile-sort">Effective Duration</span>
          {numberFormat(effectiveDuration)}
        </div>
        <div className="column">
          <span className="mobile-sort">30-Day SEC Yield</span>
          {numberFormat(monthSecYield)}
        </div>
        <div className="column">
          <span className="mobile-sort">Distribution Rate</span>
          {distributionRate === null ? 'N/A' : numberFormat(distributionRate)}
        </div>
        <div className="column">
          <span className="mobile-sort"># of Holdings</span>
          {numberFormat(numberOfHoldings, '', true)}
        </div>
      </div>
    );
  }
}

export default TableRow;
