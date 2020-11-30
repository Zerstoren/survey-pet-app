import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';
import ViewPage from './ViewPage';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={MainPage} />
      <Route exact={true} path="/survey/:id" component={ViewPage} />
    </BrowserRouter>
  )
}

export default App;