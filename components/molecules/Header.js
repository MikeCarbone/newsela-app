import styled from 'styled-components'
import Link from 'next/link'

import Logo from '@/components/atoms/Logo'
import ThemeButton from '@/components/molecules/ThemeButton'

const background = `var(--theme-color-background-primary)`
const border = `var(--theme-border-primary)`
const space = `var(--theme-space-average)`

const HeaderElement = styled.header`
  align-items: center;
  background-color: ${background};
  border-bottom: ${border};
  display: flex;
  justify-content: space-between;
  padding: ${space} 0;
  width: 100%;
`

const Header = () => (
  <HeaderElement>
    <Link href="/">
      <a>
        <Logo style={{ maxWidth: '150px' }} />
      </a>
    </Link>
    <ThemeButton />
  </HeaderElement>
)

export default Header
