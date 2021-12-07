import { useState, useEffect } from 'react'
import Link from 'next/link'
import { decode } from 'html-entities'

import useUser from '@/libs/hooks/useUser'
import triviaApi from '@/libs/triviaApi'

import Button from '@/components/atoms/Button'
import Copy from '@/components/atoms/Copy'
import ErrorMessage from '@/components/atoms/ErrorMessage'
import Heading from '@/components/atoms/Heading'
import Page from '@/components/templates/Page'
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

	if (isUserLoading) return <p>Loading...</p>
	if (userLoadError) return <p>Error loading user.</p>

	// Let's get the questions to queue up
	// Don't start the timer until we have the questions ready
	useEffect(() => {
		;(async () => {
			try {
				// Fetch session token so Trivia API knows who we are
				const sessionToken = await user.getSessionToken()

				// Get our initial questions
				const res = await triviaApi.getQuestions(
					sessionToken,
					categoryId
				)
				if (res.response_code !== 0) {
					throw new Error('Request unsuccessful.')
				}
				setQuestions(res.results)
				setCurrentQuestion(res.results[0])
				setLoading(false)

				console.log(res)

				// Questions ready let's start the timer
				startTimer()
			} catch (err) {
				console.log(err)
				setApiLoadingError(
					'Unable to load questions. Try refreshing your token.'
				)
				setLoading(false)
			}
		})()
	}, [])

	useEffect(() => {
		setCurrentQuestion(questions[questionCount])
	}, [questionCount])

	useEffect(() => {
		if (timer < 0) {
			setGameOver(true)
			clearInterval(timerObject)
		}
	}, [timer])

	const startTimer = () => {
		const clock = setInterval(() => {
			setTimer(timer => timer - 1000)
		}, 1000)
		setTimerObject(clock)
		return clock
	}

	const handleIncorrectAnswer = () => {
		console.log('click')
		setQuestionCount[questionCount + 1]
	}

	const resetToken = async () => {
		await user.resetSessionToken()
		location.reload()
	}

	if (loading) return <Copy>Loading...</Copy>
	if (apiLoadingError)
		return (
			<Page>
				<ErrorMessage>{apiLoadingError}</ErrorMessage>
				<VertSpace size={5} />
				<Button domProps={{ onClick: resetToken }}>
					Reset Questions
				</Button>
			</Page>
		)
	if (gameOver)
		return (
			<Page>
				<Heading>Game Over</Heading>
			</Page>
		)

	return (
		<Page>
			<Copy>{timer / 1000}s</Copy>
			<VertSpace size={5} />
			<Heading>{decode(currentQuestion.question)}</Heading>
			<div>
				{currentQuestion.incorrect_answers.map(i => (
					<Button
						key={i}
						secondary
						domProps={{ onClick: handleIncorrectAnswer }}
					>
						{decode(i)}
					</Button>
				))}
				<Button secondary>{currentQuestion.correct_answer}</Button>
			</div>
			<VertSpace size={5} />
			<Link href="/">
				<a>
					<Button secondary>Quit</Button>
				</a>
			</Link>
			<Button domProps={{ onClick: resetToken }}>Reset Questions</Button>
		</Page>
	)
}
