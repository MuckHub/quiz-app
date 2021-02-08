import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SignIn from './SignIn';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ResponsiveDrawer from './ResponsiveDrawer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { AuthCheck, useUser } from 'reactfire';
import { updateCorrectAnswer, getUnansweredQuestions } from '../api/userApi';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginTop: 20,
    width: 500,
    [theme.breakpoints.down('xs')]: {
      width: 300,
    },
  },
  title: {
    fontSize: 35,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  question: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 35,
    fontSize: 20,
    paddingRight: 15,
    paddingLeft: 15,
  },
  button: {
    width: 150,
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 25,
  },
  answer: {
    fontSize: 15,
    marginTop: 30,
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  message: {
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function PackPage() {
  const classes = useStyles();

  const { data: user } = useUser();
  const { packId } = useParams();

  const [data, setData] = useState();
  const [allQuestions, setAllQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [toggle, setToggle] = useState(false);

  const getQuestion = (result) => {
    if (data && allQuestions) {
      if (result) {
        updateCorrectAnswer(user.email, data, currentQuestion);
      }
      const random = Math.floor(Math.random() * allQuestions.length);
      const nextQuestion = allQuestions[random];
      setCurrentQuestion(nextQuestion);
      const updatedAllQuestions = [...allQuestions];
      updatedAllQuestions.splice(random, 1);
      setAllQuestions(updatedAllQuestions);
      setToggle(false);
    }
  };

  const getData = async () => {
    if (user) {
      const activeQuestions = await getUnansweredQuestions(user.email, packId);
      setAllQuestions(activeQuestions.questions);
      setData(activeQuestions);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getQuestion();
  }, [data]);

  return (
    <AuthCheck fallback={<SignIn />}>
      <ResponsiveDrawer />
      <Container className={classes.container} maxWidth='md'>
        {currentQuestion ? (
          <Card
            className={classes.root}
            style={toggle ? { height: 370 } : { height: 240 }}
          >
            <div className={classes.title}>{data?.title}</div>
            <div className={classes.question}>{currentQuestion?.question}</div>
            <Button
              className={classes.button}
              fullWidth={false}
              variant='contained'
              color='primary'
              onClick={() => setToggle(!toggle)}
            >
              Answer
            </Button>
            {toggle && (
              <>
                <div className={classes.answer}>{currentQuestion?.answer}</div>
                <div className={classes.buttons}>
                  <IconButton onClick={() => getQuestion(true)} color='primary'>
                    <CheckIcon fontSize='large' />
                  </IconButton>

                  <IconButton
                    onClick={() => getQuestion(false)}
                    color='primary'
                  >
                    <ClearIcon fontSize='large' />
                  </IconButton>
                </div>
              </>
            )}
          </Card>
        ) : (
          <Card className={classes.root}>
            <div className={classes.message}>
              Well done! You answered all the questions.
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={false}
                className={classes.button}
                onClick={getData}
                variant='contained'
                color='primary'
              >
                Try again
              </Button>
              <Button
                className={classes.button}
                component={Link}
                to='/account'
                variant='contained'
                color='primary'
              >
                Finish
              </Button>
            </div>
          </Card>
        )}
      </Container>
    </AuthCheck>
  );
}
