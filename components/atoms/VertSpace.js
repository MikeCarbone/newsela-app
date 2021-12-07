import styled from 'styled-components'

const VertSpace = styled.div`
  width: 100%;
  height: ${props => {
    if (props.size === 1) return '5px'
    if (props.size === 2) return '10px'
    if (props.size === 3) return '15px'
    if (props.size === 4) return '30px'
    if (props.size === 5) return '50px'
  }};
`
export default VertSpace
