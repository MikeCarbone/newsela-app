import styled from 'styled-components'

const border = `var(--theme-border-primary)`
const color = `var(--theme-color-foreground-primary)`
const brandColor = `var(--theme-color-brand-primary)`
const fontSize = `var(--theme-fontSize-main)`
const space = `var(--theme-space-big)`

const FooterContainer = styled.footer`
  border-top: ${border};
  display: flex;
  justify-content: center;
  padding: ${space} 0;
  width: 100%;
`

const FooterText = styled.p`
  color: ${color};
  font-size: ${fontSize};
  font-weight: 300;
`

const FooterLink = styled.a`
  color: ${brandColor};
`

const Footer = () => (
  <FooterContainer>
    <FooterText>
      Created Dec 2021 by Mike Carbone as an interview demo for{` `}
      <FooterLink
        href="https://newsela.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Newsela
      </FooterLink>
      .
    </FooterText>
  </FooterContainer>
)

export default Footer
