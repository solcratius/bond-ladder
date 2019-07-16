import './style.scss';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TableSort from './TableSort';
import TableRow from './TableRow';

@inject('appStore')
@observer
class ToolTable extends Component {
  constructor() {
    super();

    this.tableRow = React.createRef();
    this.tableRowHeight = 74;
    this.tableTop = 0;
  }

  componentDidUpdate(prevProp) {
    if (
      prevProp.appState !== this.props.appState ||
      prevProp.currentItems !== this.props.currentItems ||
      prevProp.winHeight !== this.props.winHeight
    ) {
      const tableRow = this.tableRow.current;

      // this.tableRowHeight = tableRow.getBoundingClientRect().height;
      this.tableTop = tableRow.offsetTop;

      this.props.updateTableBottomY(
        this.tableRowHeight * this.props.appStore.Product.productTotal +
          this.tableTop
      );
    }
  }

  onAllocationFormatUpdate = () => {
    const {
      allocationPercentFormat,
      updateAllocationPercentFormat
    } = this.props.appStore.Tool;

    updateAllocationPercentFormat(!allocationPercentFormat);
  };

  render() {
    const { currentItems, appStore } = this.props,
      { allocationPercentFormat } = appStore.Tool,
      rows = currentItems.map((key, i) => {
        return (
          <TableRow
            allocationPercentFormat={allocationPercentFormat}
            id={i}
            key={i}
            product={key}
          />
        );
      });

    return (
      <div className="product-table">
        <div className="table-sort">
          <TableSort
            allocationPercentFormat={allocationPercentFormat}
            onAllocationFormatUpdate={this.onAllocationFormatUpdate}
          />
        </div>
        <div className="table-value" ref={this.tableRow}>
          {rows}
          {/* <div
            className={`preloader${this.props.appStore.preload ? ' on' : ''}`}
          /> */}
        </div>
      </div>
    );
  }
}

export default ToolTable;
