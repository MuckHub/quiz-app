import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';
import NavBar from './NavBar';
import AddedPack from './AddedPack';
import { AuthCheck, useUser } from 'reactfire';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Account() {
  const { data: user } = useUser();
  const [data, setData] = useState();

  const classes = useStyles();

  const getUserPacks = async () => {
    if (user) {
      try {
        const data = await axios.get(`http://localhost:3100/users/`);
        const userData = data.data.find((el) => el.email === user.email);
        setData(userData.packs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserPacks();
  }, [user]);

  return (
    <AuthCheck fallback={<SignIn />}>
      <NavBar path={'account'} />
      <Container className={classes.container} maxWidth='md'>
        {data &&
          data.map((el) => {
            const results = el.questions.map((question) => {
              return question.correct === false ? 0 : 1;
            });
            const progress = results.reduce((a, b) => a + b);
            const percent = Math.round((progress / el.questions.length) * 100);

            return (
              <div key={el.id}>
                <AddedPack data={el} progress={percent} />
              </div>
            );
          })}
      </Container>
    </AuthCheck>
  );
}
