import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import ToastContainer from './config/Toast';
import Theme from './config/Theme';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
