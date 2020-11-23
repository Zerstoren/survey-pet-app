import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';

export default () => {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={MainPage} />
    </BrowserRouter>
  )
}