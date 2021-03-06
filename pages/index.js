import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import useUser from '@/libs/hooks/useUser'
import triviaApi from '@/libs/triviaApi'

import Button from '@/components/atoms/Button'
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
      <WelcomeText>
        Welcome {user.getFirstName()}, please pick your category:
      </WelcomeText>
      <VertSpace size={5} />
      <CategoryDisplay />
      <VertSpace size={5} />
      <Link href="/stats">
        <a>
          <Button>View Stats</Button>
        </a>
      </Link>
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

const WelcomeText = styled.p`
  color: var(--theme-color-foreground-primary);
  font-size: var(--theme-fontSize-main);
`
