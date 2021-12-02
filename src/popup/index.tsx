import React from 'react';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {injectGlobal} from '@emotion/css';

import App from './components/app';

import {store} from './redux/store';


injectGlobal({
  'body, #root': {
    minWidth: '580px',
    maxWidth: '580px',
    minHeight: '500px',
    maxHeight: '500px'
  }
});

render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('root'));
