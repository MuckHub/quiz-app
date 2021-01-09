import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

export default function Main() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>MAIN PAGE</div>
      <div>
        <div>User: {currentUser.email}</div>
        <Button onClick={handleLogout} variant='contained' color='primary'>
          Logout
        </Button>
      </div>
    </>
  );
}
