import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './_Redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
