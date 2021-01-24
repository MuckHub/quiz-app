import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';

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
}));

export default function Pack({ data }) {
  const classes = useStyles();

  const ratingHandler = (value) => {
    console.log(value);
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
          <Rating
            onChange={(event, value) => ratingHandler(value)}
            name='size-medium'
            defaultValue={data.rating}
          />
        </CardContent>
      </div>
      <CardContent className={classes.add}>
        <IconButton color='primary' aria-label='add an alarm'>
          <AddCircle fontSize='large' />
        </IconButton>
      </CardContent>
    </Card>
  );
}
