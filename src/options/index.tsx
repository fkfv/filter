import React from 'react';

import {render} from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/app';

import {store} from './redux/store';
import {listModules} from './reducers/modules';


store.dispatch(listModules());

render(
  <Provider store={store}>
    <App/>
  </Provider>
, document.getElementById('root'));
