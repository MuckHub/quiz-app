import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Account from './components/Account';
import Settings from './components/Settings';
import PackPage from './components/PackPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/account' component={Account} />
        <Route path='/settings' component={Settings} />
        <Route path='/pack/:packId' component={PackPage} />
      </Switch>
    </Router>
  );
}

export default App;
