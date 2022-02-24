import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Store from './store.js'

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
     <Provider store={Store}>
    <App />
  </Provider>,
    </BrowserRouter>,
  // {/* </React.StrictMode> */}
  
  document.getElementById('root')
);

