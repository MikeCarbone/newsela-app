import { useEffect, useState } from 'react'

import CategoryButton from '@/components/atoms/CategoryButton'
import ErrorMessage from '@/components/atoms/ErrorMessage'
import Wrapper from '@/components/templates/Wrapper'

export default function Home() {
	return (
		<main>
			<Wrapper>
				<h1>Welcome to the Newsela Educational Trivia Game</h1>
				<h2>Please pick your category:</h2>
				<CategoryDisplay />
			</Wrapper>
		</main>
	)
}

const CategoryDisplay = () => {
	const [categories, setCategories] = useState([])
	const [error, setError] = useState('blah blah')
	const [isLoading, setLoading] = useState(false)

	// Fetch the categories from the API and update state
	useEffect(() => {
		// Semi-colon inserted by prettier because of IIFE
		// https://github.com/prettier/prettier/pull/1129#issuecomment-292243414
		;(async () => {
			try {
				setLoading(true)

				// prettier-ignore
				const res = await fetch('https://opentdb.com/api_category.php').then(r => r.json())
				const categories = res.trivia_categories
				setCategories(categories)

				setLoading(false)
			} catch (err) {
				setLoading(false)
				setError(err)
			}
		})()
	}, [])

	if (!categories.length) return null
	return (
		<div>
			<div>
				{categories.map(c => (
					<CategoryButton key={c.id}>{c.name}</CategoryButton>
				))}
			</div>
			{isLoading && <p>Loading...</p>}
			<ErrorMessage setError={setError}>{error}</ErrorMessage>
		</div>
	)
}
