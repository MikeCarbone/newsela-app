import { useEffect, useState } from 'react'

import useUser from '@/libs/hooks/useUser'
import triviaApi from '@/libs/triviaApi'

import CategoryButton from '@/components/atoms/CategoryButton'
import ErrorMessage from '@/components/atoms/ErrorMessage'
import Heading from '@/components/atoms/Heading'
import Page from '@/components/templates/Page'
import VertSpace from '@/components/atoms/VertSpace'

export default function Home() {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Redirecting...</p>

  return (
    <Page>
      <Heading>The Newsela Educational Trivia Game</Heading>
      <VertSpace size={3} />
      <h2>Welcome {user.getFirstName()}, please pick your category:</h2>
      <VertSpace size={5} />
      <CategoryDisplay />
    </Page>
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
        const res = await triviaApi.getCategories()
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
          <CategoryButton key={c.id} categoryId={c.id}>
            {c.name}
          </CategoryButton>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      <ErrorMessage setError={setError}>{error}</ErrorMessage>
    </div>
  )
}
