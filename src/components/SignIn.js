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
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from 'reactfire';

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
  error: {
    color: 'red',
  },
}));

export default function SignIn() {
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  const submitHandler = async (data, event) => {
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(data.email, data.password);
      history.push('/');
    } catch (error) {
      setError('firebase', {
        type: 'manual',
        message: error.message,
      });
    }
    event.target.reset();
    setLoading(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <div>
          {errors.firebase && (
            <Alert severity='warning'>{errors.firebase.message}</Alert>
          )}
        </div>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <TextField
            name='email'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Email'
            autoComplete='login'
            inputRef={register({
              required: { value: true, message: 'This is required' },
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: 'Wrong format',
              },
            })}
          />
          {errors.email?.message && (
            <span className={classes.error}>{errors.email.message}</span>
          )}
          <TextField
            name='password'
            variant='outlined'
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            autoComplete='current-password'
            inputRef={register({
              required: { value: true, message: 'This is required' },
            })}
          />
          {errors.password?.message && (
            <span className={classes.error}>{errors.password.message}</span>
          )}
          <Button
            disabled={loading}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            type='submit'
            onClick={() => clearErrors()}
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
