import React, { useEffect, useState } from 'react';
import { useUser } from 'reactfire';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';

import { getPackById } from '../api/packsApi';
import { addRating } from '../api/ratingApi';

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

export default function Pack({ data }) {
  const { data: user } = useUser();
  const classes = useStyles();

  const [pack, setPack] = useState(data);
  const [rating, setRating] = useState({ value: 0, status: false });

  const ratingHandler = async (value) => {
    const newData = pack;
    newData.rating.push({ user: user.email, rating: value });
    try {
      await addRating(pack.id, newData);
      const updated = await getPackById(pack.id);
      setPack(updated.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ratingSetup = () => {
    if (pack?.rating.length > 0) {
      const rated = !!pack.rating.find((el) => el.user === user.email);
      const sum = pack.rating.map((el) => {
        return el.rating;
      });
      const avgRating = sum.reduce((a, b) => a + b) / sum.length;
      setRating({ value: avgRating, status: rated });
    }
  };

  useEffect(() => {
    ratingSetup();
  }, [pack]);

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={pack.img} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {pack.title}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {pack.description}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            ({pack.questions.length} questions)
          </Typography>
          <div className={classes.rating}>
            <Rating
              name={pack.title}
              disabled={rating?.status}
              onChange={(event, value) => ratingHandler(value)}
              value={rating?.value}
            />
            <Typography variant='subtitle1' color='textSecondary'>
              ({pack.rating.length})
            </Typography>
          </div>
        </CardContent>
      </div>
      <CardContent className={classes.add}>
        <IconButton
          onClick={() => console.log(pack.id)}
          color='primary'
          aria-label='add an alarm'
        >
          <AddCircle fontSize='large' />
        </IconButton>
      </CardContent>
    </Card>
  );
}
