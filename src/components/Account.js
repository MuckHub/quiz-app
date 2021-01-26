import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';
import ResponsiveDrawer from './ResponsiveDrawer';
import AddedPack from './AddedPack';
import { AuthCheck, useUser } from 'reactfire';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { getUserPacks } from '../api/packsApi';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Account() {
  const { data: user } = useUser();
  const [data, setData] = useState();

  const classes = useStyles();

  const getData = async () => {
    if (user) {
      try {
        const userPacks = await getUserPacks(user.email);
        setData(userPacks.data[0].packs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthCheck fallback={<SignIn />}>
      <ResponsiveDrawer path={'account'} />
      <Container className={classes.container} maxWidth='md'>
        {data &&
          data.map((el) => {
            return (
              <div key={el.id}>
                <AddedPack data={el} />
              </div>
            );
          })}
      </Container>
    </AuthCheck>
  );
}
