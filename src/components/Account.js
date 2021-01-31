import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';
import ResponsiveDrawer from './ResponsiveDrawer';
import AddedPack from './AddedPack';
import { AuthCheck, useUser } from 'reactfire';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { getUserData } from '../api/userApi';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
  },
}));

export default function Account() {
  const { data: user } = useUser();
  const [data, setData] = useState();

  const classes = useStyles();

  const getData = async () => {
    if (user) {
      try {
        const userData = await getUserData(user.email);
        setData(userData.data[0].packs);
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
        {data?.length > 0 ? (
          data.map((el) => {
            return (
              <div key={el.id}>
                <AddedPack data={el} user={user} onAddedPacksUpdate={getData} />
              </div>
            );
          })
        ) : (
          <div className={classes.message}>
            You have no packs added to your profile.
          </div>
        )}
      </Container>
    </AuthCheck>
  );
}
