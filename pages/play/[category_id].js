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

export default function Play({ categoryId, categoryName }) {
	const { user, isLoading: isUserLoading, error: userLoadError } = useUser()
	const [questions, setQuestions] = useState([])
	const [timer, setTimer] = useState(60000)
	const [loading, setLoading] = useState(true)
	const [questionCount, setQuestionCount] = useState(0)
	const [apiLoadingError, setApiLoadingError] = useState('')
	const [currentQuestion, setCurrentQuestion] = useState({})
	const [gameOver, setGameOver] = useState(false)
	const [timerObject, setTimerObject] = useState()

	//
	// Let's get the questions to queue up
	// Don't start the timer until we have the questions ready
	//
	useEffect(() => {
		;(async () => {
			try {
				const res = await fetchQuestions()
				setQuestions(res.results)

				let firstQuestion = res.results[0]
				firstQuestion = prepareShuffledAnswers(firstQuestion)

				setCurrentQuestion(firstQuestion)
				setLoading(false)

				// Questions ready let's start the timer
				const clock = setInterval(() => {
					setTimer(timer => timer - 1000)
				}, 1000)

				// Saving the timer so we can end the interval when our clock runs out
				setTimerObject(clock)
			} catch (err) {
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
		// End the game if we run out of questions to use
		if (questionCount === questions.length) {
			return setGameOver(true)
		}
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
					const res = await fetchQuestions()
					setQuestions(questions.concat(res.results))
				} catch (err) {
					// Set whatever error gets returned to the loading error for display
					setApiLoadingError(err)
					// Log it just in case
					console.log(err)
				}
			})()
		}
	}, [questionCount])

	//
	// Fetch questions from API
	//
	const fetchQuestions = async () => {
		// Fetch session token so Trivia API knows who we are
		const sessionToken = await user.getSessionToken()

		// Get our initial questions
		const res = await triviaApi.getQuestions(sessionToken, categoryId)

		// Session tokens are only alive for 6 hours
		// Fetch a new token and refresh
		if (res.response_code === 3) {
			await user.fetchSessionToken()
			resetToken()
			return Promise.reject('No more questions available.')
		}

		// No more new questions
		if (res.response_code === 4) {
			// Only refresh token if we're on initial load
			// Otherwise, other logic will end the game for us
			if (questionCount === 0) return resetToken()
			return Promise.reject(
				'Question fetch unsuccessful. Reloading token.'
			)
		}

		if (res.response_code !== 0) {
			return Promise.reject('Question fetch unsuccessful.')
		}
		return res
	}

	//
	// Function to join a question's answers into a single shuffled array
	//
	const prepareShuffledAnswers = question => {
		const incorrectAnswers = question.incorrect_answers.map(i => {
			return { correct: false, answer: i }
		})
		const correctAnswer = [
			{ correct: true, answer: question.correct_answer },
		]
		const allAnswers = incorrectAnswers.concat(correctAnswer)
		const shuffledAnswers = shuffle(allAnswers)
		question.shuffledAnswers = shuffledAnswers
		return question
	}

	//
	// What happens when an answer is clicked
	//
	const handleAnswerClick = ({ correct }) => {
		setQuestionCount(questionCount + 1)
		console.log('correct: ', correct)
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
			<Heading>{decode(currentQuestion.question)}</Heading>
			{currentQuestion.shuffledAnswers.map(a => (
				<Button
					key={a.answer}
					secondary
					domProps={{
						onClick: () =>
							handleAnswerClick({ correct: a.correct }),
					}}
				>
					{decode(a.answer)}
				</Button>
			))}
			<VertSpace size={5} />
			<Link href="/">
				<a>
					<Button secondary>Quit</Button>
				</a>
			</Link>
			<Button domProps={{ onClick: resetToken }}>Reset Questions</Button>
			<VertSpace size={5} />
			<ErrorMessage>{apiLoadingError}</ErrorMessage>
		</Page>
	)
}
