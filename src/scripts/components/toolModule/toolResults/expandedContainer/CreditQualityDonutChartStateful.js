import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ReactHighcharts from 'react-highcharts';
import { cleanNumber, percentFormat } from '../../../helper/formatting';

const colorKeys = [
    '#001a7a',
    '#009afa',
    '#49b6f7',
    '#1450d2',
    '#4271d9',
    '#00c1b6',
    '#31cbc1',
    '#008c83',
    '#31a199',
    '#00b75f',
    '#44d991'
  ],
  chartConfig = data => ({
    chart: {
      backgroundColor: 'transparent',
      height: 400,
      marginLeft: 0,
      marginRight: 0,
      type: 'pie',
      style: {
        fontSize: '12px',
        fontFamily: 'InvescoInterstate, Verdana, sans-serif'
      },
      width: 400
    },
    colors: colorKeys,
    title: {
      floating: true,
      style: {
        color: '#000000',
        fontFamily: 'InvescoInterstate, Verdana, sans-serif',
        fontSize: '28px',
        fontWeight: '300',
        lineHeight: '40px'
      },
      text: 'Credit Quality<br />Allocations',
      verticalAlign: 'middle',
      x: 0,
      y: -10
    },
    subtitle: {
      text: ''
    },
    legend: {
      // align: 'left',
      enabled: false
      // format: '{point.key} {point.y}',
      // itemMarginTop: 4,
      // itemMarginBottom: 4,
      // layout: 'vertical',
      // symbolHeight: 12,
      // symbolWidth: 12,
      // style: {
      //   color: '#000000',
      //   fontSize: '18px',
      //   fontWeight: '300'
      // },
      // symbolRadius: 0,
      // verticalAlign: 'middle',
      // x: 400,
      // y: 10
    },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: '#000000',
      borderRadius: 0,
      borderWidth: 1,
      enabled: true,
      followPointer: false,
      padding: 20,
      shadow: true,
      style: {
        color: '#000000',
        fontSize: '16px',
        fontWeight: '300'
      }
    },
    series: [
      {
        type: 'pie',
        name: 'Credit Quality',
        data
      }
    ],
    plotOptions: {
      pie: {
        borderColor: null,
        borderWidth: 0,
        center: ['50%', '50%'],
        dataLabels: {
          enabled: false
        },
        innerSize: '70%',
        shadow: false,
        showInLegend: true,
        states: {
          hover: {
            brightness: 0,
            halo: {
              // animation: {
              //   duration: 250
              // },
              // size: 10,
              // opacity: 1
              size: 1
            }
          }
        },
        tooltip: {
          headerFormat: '{point.key}: ',
          pointFormat: '<span style="font-weight:600;">{point.y:,.2f}%</span>'
        },
        allowPointSelect: false,
        point: {
          events: {
            legendItemClick: e => {
              e.preventDefault();
            }
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
class CreditQualityDonutChart extends Component {
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

  static formatTooltip(tooltip, x = this.x, points = this.points) {
    let s = `<b>${x}</b>`;
    points.forEach(point => {
      s += `<br/>${point.series.name}: ${point.y}m`;
    });

    return s;
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
      }),
      fullCreditQualityData = creditQualityValues.map((value, i) => {
        const key = creditQualityKeys[i];
        return [key === 'nr' ? 'Not Rated' : key.toUpperCase(), value];
      });

    return fullCreditQualityData.filter(value => value[1] > 0);
    // return fullCreditQualityData;
  };

  render() {
    const legendItems =
      this.state.data.length > 0
        ? this.state.data.map((item, i) => {
            return (
              <li key={i}>
                <span
                  className="legend-symbol"
                  style={{ backgroundColor: colorKeys[i] }}
                />

                {item[0]}
                <span className="value">{percentFormat(item[1])}</span>
              </li>
            );
          })
        : null;

    return (
      <div className="chart">
        <ReactHighcharts
          ref={this.chartComponent}
          config={chartConfig(this.state.data)}
        />
        <ul className="legend-items no-style">{legendItems}</ul>
      </div>
    );
  }
}

export default CreditQualityDonutChart;
