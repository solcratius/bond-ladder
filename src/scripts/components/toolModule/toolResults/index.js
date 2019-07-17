/* eslint-disable no-nested-ternary */
import './style.scss';
import React, { Component } from 'react';
import {
  cleanNumber,
  numberFormat,
  percentFormat
} from '../../helper/formatting';
import { WindowScroll, WindowSize } from '../../helper/window';
import ChevronButton from '../../ui/chevronButton';
import ExpandedContainer from './expandedContainer';

class ToolResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      fixed: false,
      newY: '100%',
      noAnim: true
    };

    this.resultContainer = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const resultsTop = this.props.tableBottomY - WindowSize.getHeight() + 165;

    if (prevProps.appState !== this.props.appState) {
      this.setState(
        {
          fixed: true
        },
        () => {
          this.setResultsPos(true);
        }
      );
      window.addEventListener(
        'scroll',
        this.updateScrollEvent.bind(null, resultsTop),
        false
      );
    }

    if (prevProps.tableBottomY !== this.props.tableBottomY) {
      this.setState(
        {
          fixed: !(resultsTop <= WindowScroll.getLivePos())
        },
        () => {
          this.setResultsPos(true);
        }
      );

      window.removeEventListener('scroll', this.updateScrollEvent, false);
      window.addEventListener(
        'scroll',
        this.updateScrollEvent.bind(null, resultsTop),
        false
      );
      window.resultsTop = resultsTop;
    }
  }

  updateScrollEvent = resultsTop => {
    this.setState(
      {
        noAnim: true,
        fixed: !(resultsTop <= WindowScroll.getLivePos())
      },
      () => {
        this.setResultsPos();
      }
    );
  };

  getNewY = () => {
    const resultContainer = this.resultContainer.current;
    return `${resultContainer.getBoundingClientRect().height - 90}px`;
  };

  expandToggle = () => {
    this.setState(
      {
        expand: !this.state.expand,
        noAnim: false
      },
      () => {
        this.setResultsPos(true);
      }
    );
  };

  setResultsPos = delay => {
    this.setState(
      {
        newY: this.getNewY()
      },
      () => {
        if (delay) {
          setTimeout(() => {
            this.setState({ noAnim: true });
          }, 500);
        }
      }
    );
  };

  getAllocationResult = value => {
    const {
        allocationPercentFormat,
        totalInvestment,
        updateInvestment
      } = this.props,
      result =
        typeof value === 'string' || value <= 0
          ? 'N/A'
          : allocationPercentFormat
          ? percentFormat((value / totalInvestment) * 100)
          : numberFormat(value, '$');

    if (!allocationPercentFormat) {
      updateInvestment(cleanNumber(result));
    }

    return (
      <span
        className={
          allocationPercentFormat && cleanNumber(result) !== 100
            ? 'warning'
            : ''
        }
      >
        {result}
      </span>
    );
  };

  render() {
    const { expand, fixed, newY, noAnim } = this.state,
      { productTotal, resultsValue, yearRange } = this.props;

    return (
      <div
        className={`table-result${fixed ? ' fixed' : ''}${
          expand ? ' expand' : ''
        }${noAnim ? ' no-anim' : ''}`}
        style={fixed ? { transform: `translateY(${expand ? 0 : newY})` } : {}}
        ref={this.resultContainer}
      >
        <div className="grid-container total">
          <div className="row">
            <div className="column" />
            <div className="column">{`Results (${productTotal}):`}</div>
            <div className="column" />
            <div className="column">
              {this.getAllocationResult(resultsValue[0])}
            </div>
            <div className="column" />
            <div className="column">{`${yearRange[0]} - ${
              yearRange[yearRange.length - 1]
            }`}</div>
            <div className="column">{resultsValue[1]}</div>
            <div className="column">{resultsValue[2]}</div>
            <div className="column">{resultsValue[3]}</div>
            <div className="column">{resultsValue[4]}</div>
            <div className="column">{resultsValue[5]}</div>
            <div className="column">{resultsValue[6]}</div>
          </div>
        </div>

        <ExpandedContainer />

        <ChevronButton
          color="dark-blue"
          direction="up"
          onClick={this.expandToggle}
          toggle={expand}
        >
          {['Open', 'Close']}
        </ChevronButton>
      </div>
    );
  }
}

export default ToolResults;
