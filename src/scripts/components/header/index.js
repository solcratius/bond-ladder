import './style.scss';
import React, { Component } from 'react';
import { Link } from '@reach/router';
import CloseButton from '../ui/closeButton';
import MultiOptionButton from '../ui/multiOptionButton';
import Modal from '../modal';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false
    };

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    const ref = this.wrapperRef.current;
    if (ref && !ref.contains(event.target)) {
      this.setState({
        showModal: false
      });
    }
  };

  modalToggle = bool => {
    this.setState({
      showModal: bool === 'close' ? false : !this.state.showModal
    });
  };

  render() {
    return (
      <header>
        <div className="grid-container">
          <div className="nav-strip">
            <Link
              to="./"
              onClick={() => {
                window.location.reload(false);
              }}
              className="logo"
            >
              <span className="icon-invesco-logo" />
              <h1>{this.props.name}</h1>
            </Link>
            <nav>
              <ul>
                <li>
                  <Link
                    to="./"
                    className="util-btn icon-help"
                    onClick={this.modalToggle}
                  />
                </li>
                <li>
                  <MultiOptionButton
                    url="#"
                    className="util-btn icon-options"
                    anchorDirection="right"
                  >
                    <Link to="./">BulletShares website</Link>
                    <Link to="./">Factor Exposure Calculator</Link>
                    <Link to="./">Portfolio Analyzer</Link>
                    <Link to="./">
                      Estimated Net Acquisition Yield Calculator
                    </Link>
                  </MultiOptionButton>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {this.state.showModal ? (
          <Modal>
            <div className="modal-box" ref={this.wrapperRef}>
              <h2 className="dark-blue">
                BulletShares<sup>®</sup> ETF Bond Ladder Tool
              </h2>
              <p>
                amet messenger bag edison bulb iceland vaporware biodiesel, 3
                wolf moon trust fund heirloom authentic. Hoodie artisan raw
                denim, you probably haven’t heard of them pop-up cray celiac.
                Keffiyeh hoodie chia, vape shoreditch af mixtape forage raw
                denim flexitarian direct trade try-hard lo-fi drinking vinegar.
                Quinoa prism green juice flannel, gastropub normcore cliche
                affogato freegan. Ugh tilde butcher photo booth shaman swag
                street art meditation tacos blog fam wayfarers try-hard migas.
                Unicorn occupy single-origin coffee cardigan. Tbh cray tacos
                drinking vinegar, shaman cloud bread lyft farm-to-table direct
                trade.
              </p>
              <CloseButton onClick={this.modalToggle}>Close</CloseButton>
            </div>
          </Modal>
        ) : null}
      </header>
    );
  }
}

export default Header;
