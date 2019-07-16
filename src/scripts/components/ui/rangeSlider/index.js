import './style.scss';
import React, { Component } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { arrayMatch } from '../../helper/math';

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newVal: [0, 100],
      timelineHL: [],
      slidingIntro: props.intro,
      // yearDuration: 0,
      yearW: 0
    };

    this.yearTotal = props.years.length;
  }

  componentDidMount() {
    this.setState({
      timelineHL: this.timelineHighlighter([0, 100]),
      yearW: parseFloat((100 / (this.yearTotal - 1)).toFixed(2))
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.intro && this.props.intro) {
      if (!arrayMatch(this.state.newVal, [0, 100])) {
        this.setState(
          {
            newVal: [0, 0],
            slidingIntro: true,
            timelineHL: this.timelineHighlighter([0, 0])
          },
          () => {
            setTimeout(() => {
              this.sliderIntro();
            }, 50);
          }
        );
      } else {
        this.props.reset(false);
      }
    }
  }

  sliderIntro = () => {
    this.setState(
      {
        newVal: [0, 100],
        timelineHL: this.timelineHighlighter([0, 100])
      },
      () => {
        setTimeout(() => {
          this.sliderIntroDone();
        }, 1050);
      }
    );
  };

  sliderIntroDone = () => {
    this.setState(
      {
        slidingIntro: false
      },
      () => {
        this.props.reset(false);
      }
    );
  };

  getValIndex = value => {
    const { yearW } = this.state,
      startIndex = Math.round(value[0] / yearW),
      endIndex = Math.round(value[1] / yearW);

    return [startIndex, endIndex];
  };

  getYearVal = value => {
    const { years } = this.props,
      valIndex = this.getValIndex(value);

    return [years[valIndex[0]], years[valIndex[1]]];
  };

  timelineHighlighter = value => {
    const { years } = this.props,
      valIndex = this.getValIndex(value),
      valueArray = years.map((year, i) =>
        i < valIndex[0] || i > valIndex[1] ? '' : 'on'
      ),
      yearOnArray = valueArray.filter(val => {
        return val === 'on';
      });

    this.props.setNewYears(years[valIndex[0]], yearOnArray.length);

    // this.setState({
    //   yearDuration: yearOnArray.length
    // });

    return valueArray;
  };

  sliderChange = value => {
    this.setState({
      newVal: value,
      timelineHL: this.timelineHighlighter(value)
    });
  };

  sliderChangeDone = value => {
    const wholeVal = value.map(val => Math.round(val / this.state.yearW)),
      percentVal = wholeVal.map(val =>
        parseFloat(((val / (this.yearTotal - 1)) * 100).toFixed(2))
      );

    this.setState(
      {
        newVal: percentVal,
        timelineHL: this.timelineHighlighter(percentVal)
      },
      () => {
        // console.log(this.state.newVal);
      }
    );
  };

  render() {
    const {
        yearW,
        newVal,
        // yearDuration,
        timelineHL,
        slidingIntro
      } = this.state,
      timelineContent = this.props.years.map((year, i) => (
        <li
          key={year}
          className={timelineHL[i]}
          style={{
            left: `${yearW * i}%`
          }}
        >
          <p>{year}</p>
        </li>
      ));

    return (
      <div className="cell medium-6 slider">
        <h5 className="instruction-title">
          Slide to Select Maturity Range&nbsp;
          {/* <span className={`value${slidingIntro ? ' hide' : ''}`}>
            {yearDuration}
            &nbsp;year{yearDuration !== 1 ? 's' : ''}&nbsp;
          </span> */}
        </h5>
        <div id="range-slider" className={slidingIntro ? 'slide-intro' : ''}>
          <Range
            className={'range-slider'}
            count={2}
            defaultValue={[0, yearW]}
            disabled={slidingIntro}
            value={newVal}
            onChange={this.sliderChange}
            onAfterChange={this.sliderChangeDone}
          />
          <ul className="timeline">{timelineContent}</ul>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
