import styled from 'styled-components'

const backgroundColor = `var(--theme-lightRed)`
const foregroundColor = `var(--theme-darkRed)`

const ErrorMessage = styled.p`
	background-color: ${backgroundColor};
	color: ${foregroundColor};
	display: inline-block;
	padding: 15px 25px;
`

export default ErrorMessage
