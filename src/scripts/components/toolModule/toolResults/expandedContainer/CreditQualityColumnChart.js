import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';
import { cleanNumber } from '../../../helper/formatting';

const CreditQualityColumnChart = inject('appStore')(
  observer(({ appStore }) => {
    const { creditQualityKeys } = appStore.Common,
      { investment } = appStore.User,
      productsCreditQuality = appStore.Product.currentProducts
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
      }),
      creditQualityData = creditQualityValues.map((value, i) => {
        const key = creditQualityKeys[i];
        return [key === 'nr' ? 'Not Rated' : key.toUpperCase(), value];
      }),
      chartConfig = {
        chart: {
          backgroundColor: 'transparent',
          height: 300,
          type: 'column'
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
              fontSize: '13px',
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
            },
            dataLabels: {
              // align: 'center',
              enabled: true,
              crop: false,
              overflow: 'none',
              format: '{point.y:,.2f}%',
              style: {
                color: '#001a7a',
                fontFamily: 'InvescoInterstate, Verdana, sans-serif',
                fontSize: '14px',
                fontWeight: '600'
              },
              x: 10
            }
          }
        },
        credits: {
          enabled: false
        }
      };
    return (
      <div className="chart">
        <h4>Credit Quality Allocations</h4>
        <ReactHighcharts config={chartConfig} />
      </div>
    );
  })
);

export default CreditQualityColumnChart;
