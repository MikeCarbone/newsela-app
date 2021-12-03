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

const padding = `var(--theme-padding-shortWide)`
const space = `var(--theme-space-average)`
const borderRadius = `var(--theme-borderRadius-primary)`

const Button = styled.button`
	background-color: ${props => props.backgroundColor};
	border-radius: ${borderRadius};
	cursor: pointer;
	margin: ${space} ${space} ${space} 0;
	padding: ${padding};
`

const CategoryButton = ({ children, domProps = {} }) => {
	// Let's give each button a random color for fun
	const randomNumber = Math.floor(
		getRandomNumber(0, POTENTIAL_BACKGROUND_COLORS.length)
	)
	const randomColor = POTENTIAL_BACKGROUND_COLORS[randomNumber]

	return (
		<Button {...domProps} backgroundColor={randomColor}>
			{children}
		</Button>
	)
}

export default CategoryButton
