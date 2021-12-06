import styled from 'styled-components'

const border = `var(--theme-border-primary)`
const borderActive = `var(--theme-border-active)`
const borderRadius = `var(--theme-borderRadius-primary)`
const fontSize = `var(--theme-fontSize-main)`
const labelColor = `var(--theme-color-foreground-primary)`
const padding = `var(--theme-padding-shortWide)`
const space = `var(--theme-space-average)`

const InputElement = styled.input`
	border: ${border};
	border-radius: ${borderRadius};
	cursor: pointer;
	display: inline-block;
	font-size: ${fontSize};
	margin: ${space} ${space} ${space} 0;
	padding: ${padding};

	&:active,
	&:focus {
		border: ${borderActive};
		outline: none;
	}
`

const Label = styled.label`
	color: ${labelColor};
	display: inline-block;
	font-size: ${fontSize};
	margin: 0 ${space} 0 0;
`

// registration will be for registering inputs from react-hook-form
// domProps should be spread on the <input /> element
// identifier will link the label and input element together
const Input = ({
	registration = {},
	domProps = {},
	labelText = '',
	identifier = '',
}) => {
	return (
		<div>
			<Label htmlFor={identifier}>{labelText}</Label>
			<InputElement id={identifier} {...domProps} {...registration} />
		</div>
	)
}

export default Input
