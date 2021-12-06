import styled from 'styled-components'

const backgroundColor = `var(--theme-color-lightRed)`
const foregroundColor = `var(--theme-color-darkRed)`
const borderRadius = `var(--theme-borderRadius-primary)`
const horSpace = `var(--theme-space-small)`
const padding = `var(--theme-padding-shortWide)`

const ErrorMessageContainer = styled.div`
	background-color: ${backgroundColor};
	border-radius: ${borderRadius};
	display: flex;
	padding: ${padding};
`

const ErrorMessageText = styled.p`
	color: ${foregroundColor};
`

const CloseButton = styled.button`
	background-color: transparent;
	color: ${foregroundColor};
	cursor: pointer;
	margin: 0 ${horSpace} 0 0;
`

// Main component that will be exported
const ErrorMessage = ({ children, setError = () => {} }) => {
	if (!children) return null

	return (
		<ErrorMessageContainer>
			<CloseButton onClick={() => setError('')}>X</CloseButton>
			<ErrorMessageText>{children}</ErrorMessageText>
		</ErrorMessageContainer>
	)
}

export default ErrorMessage
