import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={MainPage} />
    </BrowserRouter>
  )
}

export default App;