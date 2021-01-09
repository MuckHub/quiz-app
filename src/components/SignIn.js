import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { login } = useAuth();
  const history = useHistory();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async () => {
    try {
      setError(null);
      setLoading(true);
      await login(email, password);
      history.push('/');
    } catch (e) {
      setError(e);
      console.log('ERROR: ', e.message);
    }
    setLoading(false);
    setEmail('');
    setPassword('');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <div>{error && <Alert severity='error'>{error.message}</Alert>}</div>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email'
            autoComplete='login'
            autoFocus
            value={email}
            onChange={emailHandler}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={passwordHandler}
          />

          <Button
            disabled={loading}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
