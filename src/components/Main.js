import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';
import NavBar from './NavBar';
import Pack from './Pack';

import axios from 'axios';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { AuthCheck } from 'reactfire';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setData] = useState();

  const getData = async () => {
    const data = await axios.get('http://localhost:3100/packs');
    setData(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthCheck fallback={<SignIn />}>
      <NavBar path={'main'} />
      <Container className={classes.container} maxWidth='md'>
        {data &&
          data.map((el) => {
            return (
              <div key={el.id}>
                <Pack data={el} />
              </div>
            );
          })}
      </Container>
    </AuthCheck>
  );
}
