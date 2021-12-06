import styled from 'styled-components'

const background = `var(--theme-color-brand-primary)`
const backgroundHover = `var(--theme-color-brand-dark)`
const borderRadius = `var(--theme-borderRadius-primary)`
const color = `var(--theme-color-white-stable)`
const fontSize = `var(--theme-fontSize-main)`
const padding = `var(--theme-padding-shortWide)`
const space = `var(--theme-space-average)`
const transition = 'var(--theme-transition-average)'

const ButtonElement = styled.button`
	background-color: ${background};
	border-radius: ${borderRadius};
	color: ${color};
	cursor: pointer;
	display: inline-block;
	font-size: ${fontSize};
	margin: ${space} ${space} ${space} 0;
	padding: ${padding};
	transition: ${transition};

	&:active,
	&:focus,
	&:hover {
		background-color: ${backgroundHover};
		outline: none;
		transition: ${transition};
	}
`

// domProps should be spread on the <input /> element
// children will be the text within the button
const Button = ({ children, domProps = {} }) => {
	return <ButtonElement {...domProps}>{children}</ButtonElement>
}

export default Button
