import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './pages/Home';
import Hottest100Page from './pages/hottest100';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path=":year" component={Hottest100Page}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

