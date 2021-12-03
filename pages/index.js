import { useEffect, useState } from 'react'

export default function Home() {
	return (
		<main>
			<h1>Hello!</h1>
			<h2>Please pick your category:</h2>
			<CategoryDisplay />
		</main>
	)
}

const CategoryDisplay = () => {
	const [categories, setCategories] = useState([])
	const [error, setError] = useState('')
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
				console.log(res)
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
			{categories.map(c => (
				<button key={c.id}>{c.name}</button>
			))}
			{isLoading && <p>Loading...</p>}
			<p>{error}</p>
		</div>
	)
}
