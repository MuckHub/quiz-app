import React from 'react';

import { useHistory, Link } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'reactfire';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#4c61d6 !important',
    borderRadius: 3,
    color: 'white',
  },
  root: {
    marginRight: '8px',
    '&:hover': {
      backgroundColor: '#8c9bf1 !important',
      borderRadius: 3,
      color: 'white',
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      auth.signOut();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.nav}>
      <MenuItem
        classes={{
          selected: classes.selected,
          root: classes.root,
        }}
        component={Link}
        to='/'
        selected={props.path === 'main'}
      >
        Home
      </MenuItem>
      <MenuItem
        classes={{
          selected: classes.selected,
          root: classes.root,
        }}
        component={Link}
        to='/account'
        selected={props.path === 'account'}
      >
        My Acccount
      </MenuItem>
      <MenuItem
        classes={{
          selected: classes.selected,
          root: classes.root,
        }}
        component={Link}
        to='/settings'
        selected={props.path === 'settings'}
      >
        Settings
      </MenuItem>
      <MenuItem
        classes={{
          selected: classes.selected,
          root: classes.root,
        }}
        onClick={handleLogout}
      >
        Logout
      </MenuItem>
    </div>
  );
}
