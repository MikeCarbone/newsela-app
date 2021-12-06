import styled from 'styled-components'

const background = `var(--theme-color-background-primary)`
const brandPrimary = `var(--theme-color-brand-primary)`
const backgroundDark = `var(--theme-color-brand-dark)`
const backgroundLight = `var(--theme-color-brand-light)`
const border = `var(--theme-border-primary)`
const borderActive = `var(--theme-border-active)`
const borderRadius = `var(--theme-borderRadius-primary)`
const color = `var(--theme-color-white-stable)`
const fontSize = `var(--theme-fontSize-main)`
const padding = `var(--theme-padding-shortWide)`
const space = `var(--theme-space-average)`
const transition = 'var(--theme-transition-average)'
const minWidth = '200px'

const PrimaryButtonElement = styled.button`
	background-color: ${brandPrimary};
	border-radius: ${borderRadius};
	color: ${color};
	cursor: pointer;
	display: inline-block;
	font-size: ${fontSize};
	margin: ${space} ${space} ${space} 0;
	min-width: ${minWidth};
	padding: ${padding};
	transition: ${transition};
	outline: none;

	&:active,
	&:hover {
		background-color: ${backgroundDark};
		transition: ${transition};
	}
`

const SecondaryButtonElement = styled.button`
	background-color: ${background};
	border: ${border};
	border-radius: ${borderRadius};
	color: ${brandPrimary};
	cursor: pointer;
	display: inline-block;
	font-size: ${fontSize};
	margin: ${space} ${space} ${space} 0;
	min-width: ${minWidth};
	padding: ${padding};
	transition: ${transition};

	&:active,
	&:hover {
		border: ${borderActive};
		background-color: ${backgroundLight};
		transition: ${transition};
	}
`

// domProps should be spread on the <input /> element
// children will be the text within the button
const Button = ({ children, domProps = {}, secondary = false }) => {
	return secondary ? (
		<SecondaryButtonElement {...domProps}>
			{children}
		</SecondaryButtonElement>
	) : (
		<PrimaryButtonElement {...domProps}>{children}</PrimaryButtonElement>
	)
}

export default Button
