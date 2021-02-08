import React, { useMemo, useState, useEffect } from 'react';
import { useUser } from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';

import { addRating } from '../api/ratingApi';
import { getUserData, updateUserData, addUserPack } from '../api/userApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 200,
  },
  details: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 230,
  },
  add: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cover: {
    width: 200,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  rating: {
    display: 'flex',
    marginTop: 26,
  },
}));

export default function Pack({ data, onRatingUpdate }) {
  const { data: user } = useUser();
  const [addButtonState, setAddButtonState] = useState();
  const classes = useStyles();

  useEffect(() => {
    addButtonStatus();
  }, []);

  const addButtonStatus = async () => {
    try {
      const userData = await getUserData(user.email);
      const buttonState = !!userData.data[0].packs.find(
        (el) => el.id === data.id
      );
      setAddButtonState(buttonState);
    } catch (error) {
      console.log(error);
    }
  };

  const rating = useMemo(() => {
    if (data?.rating.length > 0) {
      const rated = !!data.rating.find((el) => el.user === user.email);
      const sum = data.rating.map((el) => {
        return el.rating;
      });
      const avgRating = sum.reduce((a, b) => a + b) / sum.length;
      return { value: avgRating, status: rated };
    }
  }, [data]);

  const ratingHandler = async (value) => {
    await addRating(data.id, data, user.email, value);
    onRatingUpdate();
  };

  const addPackHandler = async () => {
    await addUserPack(user.email, data);
    setAddButtonState(true);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={data.img} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {data.title}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {data.description}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            ({data.questions.length} questions)
          </Typography>
          <div className={classes.rating}>
            <Rating
              name={data.title}
              disabled={rating?.status}
              onChange={(event, value) => ratingHandler(value)}
              value={rating?.value}
            />
            <Typography variant='subtitle1' color='textSecondary'>
              ({data.rating.length})
            </Typography>
          </div>
        </CardContent>
      </div>
      <CardContent className={classes.add}>
        <IconButton
          disabled={addButtonState}
          onClick={addPackHandler}
          color='primary'
          aria-label='add an alarm'
        >
          <AddCircle fontSize='large' />
        </IconButton>
      </CardContent>
    </Card>
  );
}
