import Link from 'next/link'
import styled from 'styled-components'
import getRandomNumber from '@/libs/getRandomNumber'

const POTENTIAL_BACKGROUND_COLORS = [
  '#A7DFF0',
  '#D3CBF2',
  '#F2CBE3',
  '#F2CBCB',
  '#F2E3CB',
  '#D3F2CB',
  '#CBF2E9',
]

const borderRadius = `var(--theme-borderRadius-primary)`
const fontSize = `var(--theme-fontSize-main)`
const padding = `var(--theme-padding-shortWide)`
const space = `var(--theme-space-average)`

const CategoryButtonElement = styled.a`
  background-color: ${props => props.backgroundColor};
  border-radius: ${borderRadius};
  cursor: pointer;
  display: inline-block;
  font-size: ${fontSize};
  margin: ${space} ${space} ${space} 0;
  padding: ${padding};
`

const CategoryButton = ({ children, categoryId = '' }) => {
  // Let's give each button a random color for fun
  const randomNumber = Math.floor(
    getRandomNumber(0, POTENTIAL_BACKGROUND_COLORS.length)
  )
  const randomColor = POTENTIAL_BACKGROUND_COLORS[randomNumber]
  const categoryName = children
  return (
    <Link
      href={`/category/${categoryId}?title=${encodeURIComponent(categoryName)}`}
    >
      <CategoryButtonElement backgroundColor={randomColor}>
        {categoryName}
      </CategoryButtonElement>
    </Link>
  )
}

export default CategoryButton
