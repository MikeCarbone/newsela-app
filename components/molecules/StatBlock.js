import styled from 'styled-components'

import SubtitleText from '@/components/atoms/SubtitleText'

const brandColor = `var(--theme-color-brand-primary)`
const largeFontSize = `var(--theme-fontSize-4x)`

const LargeText = styled.p`
  color: ${brandColor};
  font-size: ${largeFontSize};
  font-weight: 600;
  text-align: center;
`

const StatBlock = ({ subtitle = '', largeText = '' }) => (
  <div>
    <SubtitleText>{subtitle}</SubtitleText>
    <LargeText>{largeText}</LargeText>
  </div>
)

export default StatBlock
