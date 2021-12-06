import styled from 'styled-components'

import Logo from '@/components/atoms/Logo'

const border = `var(--theme-border-primary)`
const space = `var(--theme-space-big)`

const HeaderElement = styled.header`
	border-bottom: ${border};
	display: flex;
	justify-content: center;
	padding: ${space} 0;
	width: 100%;
`

const Header = () => (
	<HeaderElement>
		<Logo style={{ maxWidth: '150px' }} />
	</HeaderElement>
)

export default Header
