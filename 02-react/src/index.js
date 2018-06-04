import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

render(
  <React.Fragment>
  <Router>
    <App />
  </Router>
  </React.Fragment>,
  document.getElementById('root')
);
registerServiceWorker();
