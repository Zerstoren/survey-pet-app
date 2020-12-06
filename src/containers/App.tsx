import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Details from './Details';

import MainPage from './MainPage';
import ViewPage from './ViewPage';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={MainPage} />
      <Route exact={true} path="/survey/:id" component={ViewPage} />
      <Route exact={true} path="/details/:id" component={Details} />
    </BrowserRouter>
  )
}

export default App;