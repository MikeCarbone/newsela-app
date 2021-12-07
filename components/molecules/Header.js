import styled from 'styled-components'
import Link from 'next/link'

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
    <Link href="/">
      <a>
        <Logo style={{ maxWidth: '150px' }} />
      </a>
    </Link>
  </HeaderElement>
)

export default Header
