import styled, { keyframes } from 'styled-components'

import Copy from '@/components/atoms/Copy'

const border = `var(--theme-border-primary)`
const borderRadius = `var(--theme-borderRadius-primary)`
const brandPrimary = `var(--theme-color-brand-primary)`

// Create the animation keyframes for animating the bar
const shrink = keyframes`
    from { width: 100%; }
    to { width: 0%; }
`

// Inner bar will be the one moving within the container
const InnerBar = styled.div`
  animation: ${shrink} 60s linear forwards;
  background-color: ${brandPrimary};
  border-radius: ${borderRadius};
  height: 100%;
  width: 100%;
`

// Outer bar will be an outline of the full bar, container for inner bar
const OuterBar = styled.div`
  border: ${border};
  border-radius: ${borderRadius};
  height: 15px;
  padding: 2px;
  width: 100%;
`

const Timer = ({ ms }) => {
  // Let's not show the timer when we run out of time
  if (ms < 0) return null
  return (
    <div>
      <Copy>{ms / 1000}s</Copy>
      <OuterBar>
        <InnerBar></InnerBar>
      </OuterBar>
    </div>
  )
}

export default Timer
