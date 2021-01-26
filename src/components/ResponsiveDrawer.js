import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from 'reactfire';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'white',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    display: 'flex',
    height: 64,
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
  navbar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    height: 64,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function ResponsiveDrawer({ path }) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      auth.signOut();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to='/'
          onClick={handleDrawerToggle}
          key={'Home'}
        >
          <ListItemIcon>
            <HomeRoundedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to='/account'
          onClick={handleDrawerToggle}
          key={'Account'}
        >
          <ListItemIcon>
            <AccountBoxRoundedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary={'Account'} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to='/settings'
          onClick={handleDrawerToggle}
          key={'Settings'}
        >
          <ListItemIcon>
            <SettingsRoundedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem>

        <ListItem button onClick={handleLogout} key={'logout'}>
          <ListItemIcon>
            <ExitToAppRoundedIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.navbar}>
            <NavBar path={path} />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
