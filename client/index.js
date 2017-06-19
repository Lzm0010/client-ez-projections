import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './components/App';

render(
  <BrowserRouter>
  <div>
      <Route path="/" component={App} />
  </div>
</BrowserRouter>
, document.querySelector('#main'));
