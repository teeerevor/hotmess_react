import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import Hottest100Page from './containers/Hottest100Page';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="2016" component={Hottest100Page}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

