/* eslint-disable no-nested-ternary */
import './style.scss';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { animateScroll } from 'react-scroll';
import {
  cleanNumber,
  numberFormat,
  percentFormat
} from '../../helper/formatting';
import { WindowScroll } from '../../helper/window';
import ChevronButton from '../../ui/chevronButton';
import ExpandedContainer from './expandedContainer';

@inject('appStore')
@observer
class ToolResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixed: false
    };

    this.resultsTop = 0;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateScrollEvent, false);
  }

  componentDidUpdate(prevProps) {
    const { appState, tableBottomY, winHeight } = this.props;

    if (prevProps.appState !== appState) {
      this.setState({
        fixed: true
      });
    }

    if (
      prevProps.tableBottomY !== tableBottomY ||
      prevProps.winHeight !== winHeight
    ) {
      this.resultsTop = tableBottomY - winHeight + 71;
      // console.log(`updated:${this.resultsTop}`);

      this.setState({
        fixed: !(this.resultsTop <= WindowScroll.getLivePos())
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScrollEvent, false);
  }

  getYearRange = years => {
    const beginningYear = years[0],
      endingYear = years[years.length - 1];

    return beginningYear === endingYear
      ? endingYear
      : `${beginningYear} - ${endingYear}`;
  };

  updateScrollEvent = () => {
    // console.log(`${this.resultsTop} ${WindowScroll.getLivePos()}`);
    this.setState({
      fixed: !(this.resultsTop <= WindowScroll.getLivePos())
    });
  };

  anchorToResult = () => {
    // animateScroll.scrollTo(this.props.tableBottomY + 93);
    animateScroll.scrollTo(this.props.tableBottomY + 181);
    // animateScroll.scrollTo(this.props.tableBottomY);
  };

  getAllocationResult = value => {
    const {
        allocationPercentFormat,
        totalInvestment,
        updateDownloadState,
        updateInvestment
      } = this.props,
      result =
        typeof value === 'string' || value <= 0
          ? 'N/A'
          : allocationPercentFormat
          ? percentFormat((value / totalInvestment) * 100)
          : numberFormat(value, '$'),
      downloadState = !(allocationPercentFormat && cleanNumber(result) !== 100);

    updateDownloadState(downloadState);

    if (!allocationPercentFormat) {
      updateInvestment(cleanNumber(result));
    }

    return <span className={!downloadState ? 'warning' : ''}>{result}</span>;
  };

  render() {
    const { fixed } = this.state,
      { productTotal, resultsValue, yearRange } = this.props,
      yearRangeFinal = this.getYearRange(yearRange);

    return (
      <div className={`table-result${fixed ? ' fixed' : ''}`}>
        <div className="total-value">
          <div className="grid-container">
            <div className="row">
              <div className="column">
                <div className="column-item">{`Results:`}</div>
                <div className="column-item">{`${productTotal} fund${
                  productTotal > 1 ? 's' : ''
                }`}</div>
                <div className="column-item">
                  {this.getAllocationResult(resultsValue[0])}
                </div>
              </div>
              <div className="column">{yearRangeFinal}</div>
              <div className="column">{resultsValue[1]}</div>
              <div className="column">{resultsValue[2]}</div>
              <div className="column">
                {/* <span>
                  {`${resultsValue[3]}yr${
                    cleanNumber(resultsValue[3]) !== 1 ? 's' : ''
                  }`}
                </span> */}
                {resultsValue[3]}
              </div>
              <div className="column">{resultsValue[4]}</div>
              <div className="column">{resultsValue[5]}</div>
              <div className="column">{resultsValue[6]}</div>
            </div>
          </div>
          <ChevronButton
            color="dark-blue"
            direction="down"
            onClick={this.anchorToResult}
            toggle={false}
          />
        </div>
        <ExpandedContainer
          appState={this.props.appStore.Tool.appState}
          asOfDate={this.props.appStore.Product.asOfDate}
          currentProducts={this.props.appStore.Product.currentProducts}
          ladderName={this.props.appStore.User.ladderName}
          investment={this.props.appStore.User.investment}
          resultsValue={resultsValue}
          yearRange={yearRangeFinal}
        />
      </div>
    );
  }
}

export default ToolResults;
