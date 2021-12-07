import { useState, useEffect } from 'react'
import Link from 'next/link'
import { decode } from 'html-entities'

import useUser from '@/libs/hooks/useUser'
import triviaApi from '@/libs/triviaApi'
import shuffle from '@/libs/shuffleArray'

import Button from '@/components/atoms/Button'
import ErrorMessage from '@/components/atoms/ErrorMessage'
import Heading from '@/components/atoms/Heading'
import Page from '@/components/templates/Page'
import Timer from '@/components/molecules/Timer'
import VertSpace from '@/components/atoms/VertSpace'

export async function getServerSideProps(context) {
  return {
    props: {
      categoryId: context.params.category_id,
      categoryName: context.query.title,
    },
  }
}

//
// State details:
// user            = our user object from local storage
// questions       = the questions we have loaded from the API
// timer           = milliseconds that count down our timer
// loading         = whether we have our first batch of questions before start
// questionCount   = number of questions we have answered, index of questions
// apiLoadingError = string error to display if we run into issues
// currentQuestion = current question object
// gameOver        = whether our game has ended or not
// timerObject     = the setInterval object that controls our timer
//
export default function Play({ categoryId, categoryName }) {
  const { user, isLoading: isUserLoading, error: userLoadError } = useUser()
  const [questions, setQuestions] = useState([])
  const [timer, setTimer] = useState(60000)
  const [loading, setLoading] = useState(true)
  const [questionCount, setQuestionCount] = useState(0)
  const [apiLoadingError, setApiLoadingError] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [gameOver, setGameOver] = useState(false)
  const [timerObject, setTimerObject] = useState({})

  //
  // Let's get the questions to queue up
  // Don't start the timer until we have the questions ready
  //
  useEffect(() => {
    ;(async () => {
      try {
        //
        // Fetch questions to start game
        //
        const res = await fetchQuestions()
        setQuestions(res.results)

        //
        // Load up first question
        //
        let firstQuestion = res.results[0]
        firstQuestion = prepareShuffledAnswers(firstQuestion)
        setCurrentQuestion(firstQuestion)

        //
        // Now that questions are ready, let's clear the loading state
        // And start the timer
        //
        setLoading(false)
        const clock = setInterval(() => {
          setTimer(timer => timer - 1000)
        }, 1000)

        //
        // Saving the timer so we can end the interval when our clock runs out
        //
        setTimerObject(clock)
      } catch (err) {
        //
        // Handle any intialization errors
        //
        console.log(err)
        setApiLoadingError(
          'Unable to load questions. Try refreshing your token.'
        )
        setLoading(false)
      }
    })()
  }, [])

  //
  // Update the current question object when the question count is updated
  //
  useEffect(() => {
    if (loading) return

    //
    // End the game if we run out of questions to use
    //
    if (questionCount === questions.length) {
      return setGameOver(true)
    }

    //
    // Set up next question
    //
    let nextQuestion = questions[questionCount]
    nextQuestion = prepareShuffledAnswers(nextQuestion)
    setCurrentQuestion(nextQuestion)
  }, [questionCount])

  //
  // End the game when the timer runs out
  //
  useEffect(() => {
    if (timer < 0) {
      setGameOver(true)

      //
      // End the timer so it doesnt keep running in the background
      //
      clearInterval(timerObject)
    }
  }, [timer])

  //
  // Fetch more questions when we run out
  // We'll start loading the new questions when we're 2 away from the end
  // This will give us some time to load in the background
  //
  useEffect(() => {
    if (questionCount === questions.length - 2) {
      ;(async () => {
        try {
          //
          // Load more questions
          //
          const res = await fetchQuestions()
          setQuestions(questions.concat(res.results))
        } catch (err) {
          //
          // Set whatever error gets returned to the loading error for display
          //
          setApiLoadingError(err)

          //
          // Log it just in case
          //
          console.log(err)
        }
      })()
    }
  }, [questionCount])

  //
  // Fetch questions from API
  //
  const fetchQuestions = async () => {
    //
    // Fetch session token so Trivia API knows who we are
    //
    const sessionToken = await user.getSessionToken()

    //
    // Get our questions
    //
    const res = await triviaApi.getQuestions(sessionToken, categoryId)

    //
    // Session tokens are only alive for 6 hours
    // Fetch a new token and refresh
    // error code 3 indicates our session token is stale
    // More details here: https://opentdb.com/api_config.php
    //
    if (res.response_code === 3) {
      await user.fetchSessionToken()

      //
      // On the off chance our token expires mid game,
      // let's let the game finish when there are no more questions
      // Otherwise, we can refresh the page to reinitialize everything
      //
      if (questionCount === 0) {
        resetToken()
      }

      //
      // We can still send an error -- it won't interrupt gameplay
      //
      return Promise.reject('No more questions available.')
    }

    //
    // Error code 4 indicates we have ran out of new questions
    // Similar as above, we'll let the game end naturally
    // More details here: https://opentdb.com/api_config.php
    //
    if (res.response_code === 4) {
      //
      // Only refresh token if we're on initial load
      // Otherwise, other logic will end the game for us
      //
      if (questionCount === 0) {
        resetToken()
      }
      return Promise.reject('Question fetch unsuccessful. Reloading token.')
    }

    //
    // All other errors get the standard treatment
    //
    if (res.response_code !== 0) {
      return Promise.reject('Question fetch unsuccessful.')
    }

    //
    // Return the response if everything is okay
    //
    return res
  }

  //
  // Function to join a question's answers into a single shuffled array
  // We append the question
  //
  const prepareShuffledAnswers = questionObj => {
    let answers = questionObj.incorrect_answers.map(i => {
      return { correct: false, answer: i }
    })
    const correctAnswer = { correct: true, answer: questionObj.correct_answer }
    answers.push(correctAnswer)

    //
    // Shuffle the wrong and right answers randomly
    //
    const shuffledAnswers = shuffle(answers)

    //
    // Add the answers as a property on the existing question object
    //
    questionObj.shuffledAnswers = shuffledAnswers
    return questionObj
  }

  //
  // What happens when an answer is clicked
  //
  const handleAnswerClick = ({ correct }) => {
    // Change colors
    handleAnswersColorChangeAferClick()

    // Delay the question switch so we can see our right answer with the colors
    setTimeout(() => {
      setQuestionCount(questionCount + 1)
    }, 1000)
  }

  //
  // Handle the color changing after an answer is clicked
  //
  const handleAnswersColorChangeAferClick = () => {
    //
    // All answer buttons
    //
    const answerButtons = Array.from(
      document.getElementsByClassName('answer-button')
    )

    //
    // Find the index of the correct answer in our shuffled deck
    // prettier-ignore
    //
    const correctIndex = currentQuestion.shuffledAnswers.findIndex(a => a.correct)

    //
    // This operation will control the color changing of the buttons
    //
    answerButtons.forEach((a, i) => {
      //
      // Green if indexes match === right answer
      //
      if (i === correctIndex) {
        a.style.color = 'var(--theme-color-darkGreen)'
        a.style.backgroundColor = 'var(--theme-color-lightGreen)'

        //
        // Red if not === wrong answer
        //
      } else {
        a.style.color = 'var(--theme-color-darkRed)'
        a.style.backgroundColor = 'var(--theme-color-lightRed)'
      }
    })
  }

  //
  // Resetting session token will allow us to get a fresh question set
  // This error usually happens on page load when the first questions are loaded
  // So let's take care of the reload for the user for now
  //
  const resetToken = async () => {
    await user.resetSessionToken()
    location.reload()
  }

  if (isUserLoading || loading) return <p>Loading...</p>
  if (userLoadError) return <p>Error loading user.</p>
  if (gameOver)
    return (
      <Page>
        <Heading>Game Over</Heading>
      </Page>
    )

  return (
    <Page>
      <Timer ms={timer} />
      <VertSpace size={5} />

      {/* One off layout to prevent shifting of the questions, doesn't need its own component */}
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '300px' }}
      >
        <Heading>{decode(currentQuestion.question)}</Heading>
        <div style={{ marginTop: 'auto' }}>
          {currentQuestion.shuffledAnswers.map(a => (
            <Button
              // Append the question so True/False answers get a rerender
              // Without this the colors don't disappear if two T/F questions are rendered in a row
              key={currentQuestion.question + a.answer}
              secondary
              domProps={{
                onClick: () => handleAnswerClick({ correct: a.correct }),
                className: 'answer-button',
              }}
            >
              {decode(a.answer)}
            </Button>
          ))}
        </div>
      </div>
      <VertSpace size={5} />
      <ErrorMessage>{apiLoadingError}</ErrorMessage>
    </Page>
  )
}
