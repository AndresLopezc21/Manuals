// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage setToken={setToken} />
        </Route>
        <Route path="/">
          {token ? <HomePage /> : <LoginPage setToken={setToken} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;