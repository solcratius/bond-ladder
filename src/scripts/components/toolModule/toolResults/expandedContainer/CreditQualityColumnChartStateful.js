import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';
import { cleanNumber } from '../../../helper/formatting';
import { defaultState } from '../../../../models/Store';

@inject('appStore')
@observer
class CreditQualityColumnChart extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      chartConfig: {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        title: {
          text: 'Credit Quality Allocations'
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
            }
          },
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
            data: this.state.data
          }
        ],
        plotOptions: {
          column: {
            color: '#001a7a',
            states: {
              hover: {
                color: '#001a7a'
              }
            }
          },
          series: {
            animation: {
              duration: 1000
            }
          }
        },
        credits: {
          enabled: false
        }
      }
    };
  }

  getNewData = () => {
    const { creditQualityKeys } = defaultState,
      { currentProductData } = this.props.appStore.Product,
      productsCreditQuality = currentProductData
        .filter(product => {
          return product.selected && product.show;
        })
        .map(product => {
          return [product.allocation, product.creditQuality];
        }),
      creditQualityValues = creditQualityKeys.map(key => {
        return productsCreditQuality.reduce((prev, cur) => {
          return prev + cur[0] * 0.01 * cleanNumber(cur[1][key]);
        }, 0);
      }),
      creditQualityData = creditQualityValues.map((value, i) => {
        const key = creditQualityKeys[i];
        return [key === 'nr' ? 'Not Rated' : key.toUpperCase(), value];
      });

    return creditQualityData;
  };

  render() {
    return (
      <div className="chart">
        <ReactHighcharts config={this.state.chartConfig} />
      </div>
    );
  }
}

export default CreditQualityColumnChart;
