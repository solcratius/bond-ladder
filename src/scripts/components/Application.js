import './style.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { Link } from '@reach/router';
// import { numberFormat } from './helper/formatting';

import Footer from './footer';
import Header from './header';
import ImportantInfo from './footer/Important_Information';
import IntroModule from './introModule';
import Methodology from './footer/Methodology';
import ToolModule from './toolModule';

const jsonPath = 'http://localhost:8080/public/sampleData.json';
// 'https://www.invesco.com/bond-ladder/bondLadder/0?action=getLadderToolData';

@inject('appStore')
@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedData: false,
      transitioning: false,
      reset: false
    };
  }

  componentDidMount() {
    const { currentProductsInit, setAsOfDate } = this.props.appStore.Product;

    axios.get(jsonPath).then(res => {
      const json = res.data,
        catKeys = Object.keys(json.tickers),
        rawData = catKeys
          .map(cat => {
            const items = json.tickers[cat].map(item => {
              const catName = cat
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => {
                    return str.toUpperCase();
                  }),
                newItem = {
                  ...item,
                  criteria:
                    catName === 'Emerging' ? `${catName} Markets Debt` : catName
                };
              return newItem;
            });
            return items;
          })
          .flat();

      currentProductsInit(rawData);
      setAsOfDate(json.asOfDate);

      this.setState({
        loadedData: true
      });
    });
  }

  onStartClick = bool => {
    this.setState(
      {
        transitioning: bool
      },
      () => {
        setTimeout(() => {
          this.props.appStore.Tool.updateAppState('Tools');
        }, 750);
      }
    );
  };

  resetUpdate = bool => {
    this.setState({
      reset: bool
    });
  };

  resetAll = () => {
    this.setState({
      reset: true
    });

    this.props.appStore.Tool.resetTool();
    // console.log(`Resetting...`);
  };

  render() {
    const { loadedData, reset, transitioning } = this.state,
      { appState } = this.props.appStore.Tool,
      dataContent = loadedData ? (
        <div className="main-container">
          <IntroModule
            onStartClick={this.onStartClick}
            resetAll={this.resetAll}
          />
          <ToolModule
            appState={appState}
            resetAll={this.resetAll}
            resetUpdate={this.resetUpdate}
            slidingIntro={reset}
          />
        </div>
      ) : (
        <div className="main-container">Loading</div>
      );

    return (
      <div
        className={`main-bg${transitioning ? ' transition' : ''}${
          appState === 'Tools' ? ' tool' : ''
        }`}
      >
        <Header name="BulletShares ETF Bond Ladder Tool" />
        {dataContent}
        <div className="grid-container bottom-contents">
          <Methodology />
          <ImportantInfo />
        </div>
        <Footer>
          <Link to="./">Prospectus</Link>
          <Link to="./">Program Description</Link>
          <Link to="./">Security</Link>
          <Link to="./">Careers</Link>
          <Link to="./">Terms of Use</Link>
          <Link to="./">Privacy</Link>
          <Link to="./">Legal</Link>
          <Link to="./">Money Market Holdings</Link>
          <Link to="./">FINRA BrokerCheck</Link>
        </Footer>
      </div>
    );
  }
}

export default App;
