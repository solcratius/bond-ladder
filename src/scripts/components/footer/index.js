import './style.scss';
import React from 'react';
import { Link } from '@reach/router';

const Footer = props => {
  const footerNav = props.children.map((child, i) => <li key={i}>{child}</li>);

  return (
    <footer>
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell medium-8">
            <nav>
              <ul className="no-style">{footerNav}</ul>
            </nav>
            <p className="small-text">
              *See Invesco QQQ ETF standardized performance. Performance data
              quoted represents past performance. Past performance is not a
              guarantee of future results; current performance may be higher or
              lower than performance quoted. Investment returns and principal
              value will fluctuate and Shares, when redeemed, may be worth more
              or less than their original cost. See invesco.com to find the most
              recent month-end performance numbers. Market returns are based on
              the midpoint of the bid/ask spread at 4 p.m. ET and do not
              represent the returns an investor would receive if shares were
              traded at other times. Fund performance reflects fee waivers,
              absent which, performance data quoted would have been lower.
            </p>
            <p className="small-text">
              **As of August 23, 2018, Invesco QQQ ETF holds 12.38% of Apple
              Inc., 10.80% of Amazon.com Inc, 0.85% of Starbucks Corp, 4.9% of
              Alphabet Inc (GOOG) and 4.26% of Alphabet Inc (GOOGL).
            </p>
          </div>
          <div className="cell medium-4">
            <span className="social-title">Stay Connected:</span>
            <ul className="social-links no-style">
              <li>
                <Link to="#">
                  <span className="icon-linkedin" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span className="icon-facebook" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span className="icon-twitter" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <span className="icon-youtube" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-x">
          <div className="cell">
            &copy;2019 Invesco Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
