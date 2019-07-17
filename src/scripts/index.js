import '../styles/index.scss';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import Application from './components/Application';
import { UserAgent, WindowSize } from './components/helper/window';

import Common from './models/CommonStore';
import Product from './models/ProductStore';
import Tool from './models/ToolStore';
import User from './models/UserStore';

const stores = {
  Common,
  Product,
  Tool,
  User
};

UserAgent.set();
WindowSize.init();

render(
  <Provider appStore={stores}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
