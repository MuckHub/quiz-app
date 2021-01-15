import React from 'react';

import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import SignIn from './SignIn';

import { AuthCheck, useUser, useAuth } from 'reactfire';

export default function Main() {
  const history = useHistory();
  const auth = useAuth();
  const { data: user } = useUser();

  const handleLogout = async () => {
    try {
      auth.signOut();
      history.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthCheck fallback={<SignIn />}>
      <div>MAIN PAGE</div>
      <div>
        <div>User: {user?.email}</div>
        <Button onClick={handleLogout} variant='contained' color='primary'>
          Logout
        </Button>
      </div>
    </AuthCheck>
  );
}
