import './style.scss';
import WindowSizeListener from 'react-window-size-listener';
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
    this.tableRowHeight = 0;
    this.tableTop = 0;
  }

  componentDidUpdate(prevProp) {
    if (
      prevProp.appState !== this.props.appState ||
      prevProp.currentItems !== this.props.currentItems ||
      prevProp.winHeight !== this.props.winHeight
    ) {
      setTimeout(() => {
        this.updateTableBottomY();
      }, 50);
      // this.updateTableBottomY();
    }
  }

  updateTableBottomY() {
    const tableRow = this.tableRow.current;
    this.tableRowHeight = tableRow.getBoundingClientRect().height;
    this.tableTop = tableRow.offsetTop;

    this.props.updateTableBottomY(this.tableRowHeight + this.tableTop + 71);
    tableRow.style.minHeight = `calc(100vh - ${this.tableTop + 81}px)`;
  }

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
      <div className="product-table" ref={this.tableRow}>
        {/* <div className="scrollable-table"> */}
        <WindowSizeListener onResize={() => this.updateTableBottomY()} />
        <div className="table-sort">
          <TableSort />
        </div>
        <div className="table-value">
          {rows}
          {/* <div
            className={`preloader${this.props.appStore.preload ? ' on' : ''}`}
          /> */}
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default ToolTable;
