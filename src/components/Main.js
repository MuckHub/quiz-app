import React, { useState, useEffect } from 'react';
import SignIn from './SignIn';
import Pack from './Pack';
import ResponsiveDrawer from './ResponsiveDrawer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { AuthCheck } from 'reactfire';
import { getAllPacks } from '../api/packsApi';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Main() {
  const classes = useStyles();
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const allPacks = await getAllPacks();
      setData(allPacks.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthCheck fallback={<SignIn />}>
      <ResponsiveDrawer path={'main'} />
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
