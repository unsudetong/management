import React from 'react';
import ReactDOM from 'react-dom';
import exportModule from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <exportModule.App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
