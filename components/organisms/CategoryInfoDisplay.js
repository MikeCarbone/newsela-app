import { useState, useEffect } from 'react'
import styled from 'styled-components'

import triviaApi from '@/libs/triviaApi'

import Copy from '@/components/atoms/Copy'
import VertSpace from '@/components/atoms/VertSpace'

const borderRadius = `var(--theme-borderRadius-primary)`
const fontSizeBig = `var(--theme-fontSize-2x)`
const fontSizeMain = `var(--theme-fontSize-main)`
const space = `var(--theme-space-average)`
const flexDirection = `var(--theme-responsive-flexDirection)`
const stableBlack = `var(--theme-color-black-stable)`

const BlocksContainer = styled.div`
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: space-between;
  width: 100%;
`
const Block = styled.div`
  background-color: ${props => props.background};
  border-radius: ${borderRadius};
  color: ${props => props.color};
  font-size: ${fontSizeMain};
  padding: ${space} ${space} ${space} ${space};
  max-width: 500px;
  width: 100%;
`
const BlockNumber = styled.p`
  color: ${stableBlack};
  font-size: ${fontSizeBig};
`

const CategoryInfoDisplay = ({ categoryId }) => {
  const [categoryInfo, setCategoryInfo] = useState({})

  // Get current category info
  // Lists the amount of questions within this category
  useEffect(() => {
    ;(async () => {
      try {
        const res = await triviaApi.getCategoryInfo(categoryId)
        setCategoryInfo(res.category_question_count)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <div>
      <BlocksContainer>
        <Block
          background="var(--global-lightGreen)"
          color="var(--global-darkGreen)"
        >
          <BlockNumber>{categoryInfo.total_easy_question_count}</BlockNumber>
          <p>easy questions</p>
        </Block>
        <Block
          background="var(--global-lightOrange)"
          color="var(--global-darkOrange)"
        >
          <BlockNumber>{categoryInfo.total_medium_question_count}</BlockNumber>
          <p>medium questions</p>
        </Block>
        <Block
          background="var(--global-lightRed)"
          color="var(--global-darkRed)"
        >
          <BlockNumber>{categoryInfo.total_hard_question_count}</BlockNumber>
          <p>hard questions</p>
        </Block>
      </BlocksContainer>
      <VertSpace size={4} />
      <Copy>
        This category has {categoryInfo.total_question_count} total questions.
        You'll have 60 seconds to answer as many questions as you can. If you
        run out of questions to answer, time will run out automatically. Good
        luck!
      </Copy>
    </div>
  )
}

export default CategoryInfoDisplay
