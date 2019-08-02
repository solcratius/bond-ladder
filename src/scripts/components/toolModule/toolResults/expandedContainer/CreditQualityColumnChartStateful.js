import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';
import { cleanNumber } from '../../../helper/formatting';

const chartConfig = data => ({
  chart: {
    backgroundColor: 'transparent',
    height: 300,
    type: 'column',
    style: {
      fontSize: '12px',
      fontFamily: 'InvescoInterstate, Verdana, sans-serif'
    }
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    type: 'category',
    labels: {
      // rotation: -45,
      style: {
        fontSize: '12px',
        fontFamily: 'InvescoInterstate, Verdana, sans-serif'
      },
      y: 30
    },
    lineColor: '#cfcfcf',
    lineWidth: 1,
    minorTickLength: 0,
    tickLength: 0
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    },
    labels: {
      format: '{value}%'
    }
  },
  legend: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  series: [
    {
      name: 'Credit Quality',
      data
    }
  ],
  plotOptions: {
    column: {
      color: '#001a7a',
      states: {
        hover: {
          color: '#001a7a'
        }
      },
      animation: {
        duration: 1000
      }
    },
    series: {
      animation: {
        duration: 1000
      },
      dataLabels: {
        align: 'center',
        enabled: true,
        crop: false,
        overflow: 'none',
        format: '{point.y:,.2f}%',
        style: {
          color: '#001a7a',
          fontFamily: 'InvescoInterstate, Verdana, sans-serif',
          fontSize: '12px',
          fontWeight: '400',
          marginLeft: '40px'
        }
      }
    }
  },
  credits: {
    enabled: false
  }
});

@inject('appStore')
@observer
class CreditQualityColumnChart extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    this.chartComponent = React.createRef();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.products !== this.props.products) {
      this.setState(
        {
          data: this.creditQualityData()
        },
        () => {
          this.chartComponent.current.chart.reflow();
        }
      );
    }

    if (prevProp.appState !== this.props.appState) {
      this.chartComponent.current.chart.reflow();
    }
  }

  creditQualityData = () => {
    const { creditQualityKeys } = this.props.appStore.Common,
      { investment } = this.props.appStore.User,
      productsCreditQuality = this.props.products
        .filter(product => {
          return product.selected && product.show;
        })
        .map(product => {
          const allocation = product.allocation / investment;
          return [allocation, product.creditQuality];
        }),
      creditQualityValues = creditQualityKeys.map(key => {
        return productsCreditQuality.reduce((prev, cur) => {
          return prev + cur[0] * cleanNumber(cur[1][key]);
        }, 0);
      });

    return creditQualityValues.map((value, i) => {
      const key = creditQualityKeys[i];
      return [key === 'nr' ? 'Not Rated' : key.toUpperCase(), value];
    });
  };

  render() {
    return (
      <div className="chart">
        <h4>Credit Quality Allocations</h4>
        <ReactHighcharts
          ref={this.chartComponent}
          config={chartConfig(this.state.data)}
        />
      </div>
    );
  }
}

export default CreditQualityColumnChart;
