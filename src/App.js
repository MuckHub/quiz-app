import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
