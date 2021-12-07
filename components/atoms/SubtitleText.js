import styled from 'styled-components'

const tinyFontSize = `var(--theme-fontSize-tiny)`
const foregroundColor = `var(--theme-color-foreground-primary)`

const SubtitleText = styled.p`
  color: ${foregroundColor};
  font-size: ${tinyFontSize};
  letter-spacing: 1.5px;
  text-align: center;
  text-transform: uppercase;
`

export default SubtitleText
