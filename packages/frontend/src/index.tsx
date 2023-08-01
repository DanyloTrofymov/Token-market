import { EventEmitter } from 'events';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './modules/app';

const emitter = new EventEmitter();
emitter.setMaxListeners(20);

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
