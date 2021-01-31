import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

import { getUserData, updateUserData } from '../api/userApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 100,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      height: 200,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 230,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function AddedPack({ data, user, onAddedPacksUpdate }) {
  const classes = useStyles();

  const results = data.questions.map((question) => {
    return question.correct === false ? 0 : 1;
  });
  const progress = results.reduce((a, b) => a + b);
  const percent = Math.round((progress / data.questions.length) * 100);

  const removePackHandler = async () => {
    const userData = await getUserData(user.email);
    const newData = userData.data[0];
    const updatedPacks = newData.packs.filter((el) => el.id !== data.id);
    newData.packs = updatedPacks;
    await updateUserData(newData.id, newData);
    onAddedPacksUpdate();
  };

  const resetPackHandler = async () => {
    console.log('reset');
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography component='h5' variant='h5'>
          {data.title}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Progress:
        </Typography>
        <Box display='flex' alignItems='center'>
          <Box width='40%' mr={1}>
            <LinearProgress variant='determinate' value={percent} />
          </Box>
          <Box minWidth={30}>
            <Typography variant='body2' color='textSecondary'>
              {`${percent}%`}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardContent className={classes.buttons}>
        <Tooltip title='Start'>
          <IconButton color='primary' aria-label='start'>
            <PlayCircleOutlineIcon fontSize='large' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Reset'>
          <IconButton
            disabled={percent === 0 ? true : false}
            onClick={resetPackHandler}
            color='primary'
            aria-label='reset'
          >
            <RotateLeftIcon fontSize='large' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Remove'>
          <IconButton
            onClick={removePackHandler}
            color='primary'
            aria-label='delete'
          >
            <HighlightOffIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
