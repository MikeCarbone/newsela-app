import styled from 'styled-components'

import Footer from '@/components/molecules/Footer'
import Header from '@/components/molecules/Header'
import Wrapper from '@/components/templates/Wrapper'

const MainContainer = styled.main`
  min-height: 90vh;
`

const Page = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer>
        <Wrapper>{children}</Wrapper>
      </MainContainer>
      <Footer />
    </>
  )
}

export default Page
