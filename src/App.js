import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import MyComponent from './containers/MyComponent';
import MyOtherWithStoreComponent from './containers/MyOtherComponent';

const MyApp = props => (
  <Router>
    <Header />
    <Route path="/" exact component={MyComponent} />
    <Route path="/other/" component={MyOtherWithStoreComponent} />
  </Router>
);

export default MyApp
