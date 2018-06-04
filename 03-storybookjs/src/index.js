import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

import {setObservableConfig} from 'recompose';
import rxjsConfig from 'recompose/rxjsObservableConfig';

setObservableConfig(rxjsConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
