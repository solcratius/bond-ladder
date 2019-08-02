import './style.scss';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// import uniqueId from 'lodash/uniqueId';
import ToolProfile from './toolProfile';
import ToolFilters from './toolFilters';
import ResetButton from '../ui/resetButton';

import ToolTable from './toolTable';
import ToolResults from './toolResults';
import Common from '../../models/CommonStore';
import { UserAgent, WindowSize } from '../helper/window';

const HTML = document.documentElement;

@inject('appStore')
@observer
class ToolModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTool: false,
      tableBottomY: 0,
      winHeight: WindowSize.getHeight()
    };

    this.time = null;
    this.timeout = false;
    this.delta = 50;
  }

  componentDidUpdate(prevProp) {
    if (prevProp.appState !== this.props.appState) {
      setTimeout(() => {
        this.setState({ showTool: true });
      }, 50);
    }

    if (!UserAgent.isTouch) {
      window.removeEventListener('resize', this.startResize);
      window.addEventListener('resize', this.startResize);
    } else {
      window.removeEventListener('orientationchange', this.startResize);
      window.addEventListener('orientationchange', this.startResize);
    }
  }

  startResize = () => {
    this.time = new Date();

    if (this.timeout === false) {
      this.timeout = true;
      HTML.classList.add('no-anim');

      setTimeout(this.endResize, this.delta);
    }
  };

  endResize = () => {
    if (new Date() - this.time < this.delta) {
      setTimeout(this.endResize, this.delta);
    } else {
      this.timeout = false;
      const curHeight = WindowSize.getHeight();

      this.setState(
        {
          winHeight: curHeight
        },
        () => {
          HTML.classList.remove('no-anim');

          // if (curHeight >= 700) {
          //   HTML.classList.remove('short');
          // } else {
          //   HTML.classList.add('short');
          // }
        }
      );
    }
  };

  updateTableBottomY = value => {
    this.setState({
      tableBottomY: value
    });
  };

  render() {
    const { showTool, tableBottomY, winHeight } = this.state,
      { appState, appStore, resetAll, resetUpdate, slidingIntro } = this.props,
      {
        asOfDate,
        currentProductResults,
        currentProducts,
        productTotal,
        selectedYears
      } = appStore.Product,
      { allocationPercentFormat, updateDownloadState } = appStore.Tool,
      { investment, updateInvestment } = appStore.User;

    return (
      <section className={`tool-module${showTool ? ' show' : ''}`}>
        <ToolProfile tableBottomY={tableBottomY} />
        <div className="component">
          <div className="grid-container">
            <div className="grid-x">
              <div className="cell">
                <ResetButton icon="icon-loop" onClick={resetAll} to="./">
                  Reset
                </ResetButton>
              </div>
            </div>

            <ToolFilters
              asOfDate={asOfDate}
              intro={slidingIntro}
              reset={resetUpdate}
              years={Common.years}
            />
            <ToolTable
              appState={appState}
              currentItems={currentProducts}
              updateTableBottomY={this.updateTableBottomY}
              winHeight={winHeight}
            />
          </div>
          <ToolResults
            appState={appState}
            allocationPercentFormat={allocationPercentFormat}
            yearRange={selectedYears}
            totalInvestment={investment}
            productTotal={productTotal}
            resultsValue={currentProductResults}
            tableBottomY={tableBottomY}
            updateDownloadState={updateDownloadState}
            updateInvestment={updateInvestment}
            winHeight={winHeight}
          />
        </div>
      </section>
    );
  }
}

export default ToolModule;
