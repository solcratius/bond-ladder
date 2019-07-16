import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';
import { cleanNumber } from '../../../helper/formatting';

const CreditQualityColumnChart = inject('appStore')(
  observer(({ appStore }) => {
    const { creditQualityKeys } = appStore.Common,
      productsCreditQuality = appStore.Product.currentProducts
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
      }),
      chartConfig = {
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
            data: creditQualityData
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
            }
          }
        },
        credits: {
          enabled: false
        }
      };

    return (
      <div className="chart">
        <ReactHighcharts config={chartConfig} />
      </div>
    );
  })
);

export default CreditQualityColumnChart;
