import { useState, useEffect } from 'react'
import styled from 'styled-components'

import useUser from '@/libs/hooks/useUser'

import Copy from '@/components/atoms/Copy'
import ErrorMessage from '@/components/atoms/ErrorMessage'
import StatBlock from '@/components/molecules/StatBlock'
import SubtitleText from '@/components/atoms/SubtitleText'
import VertSpace from '@/components/atoms/VertSpace'

const border = `var(--theme-border-primary)`
const padding = 'var(--theme-space-average)'

const ColumnHeading = styled.p`
  border-bottom: ${border};
  text-align: center;
  padding: ${padding};
`

const ColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
`

const FlexEven = styled.div`
  display: flex;
  justify-content: space-evenly;
`

// Calculate percentage correct based off of correct and total numbers
// .toFixed(1) will round to one decimal place
// Doesn't need to live inside a component, but not using anywhere else
// So we can keep it in this file for now
const getPercentageCorrect = (correct, total) => {
  return Number((correct / total) * 100).toFixed(1)
}

// Bigger component to display statistics
// Can stand alone and doesn't require any props
// If showing after a game, we can pass in post-game statistics as an object:
//  { seen: 12, correct: 4 }
//
//
const Stats = ({ postGame = null }) => {
  const [stats, setStats] = useState(null)
  const { user, isLoading, error } = useUser()

  // Fetch our stats from the user object in local storage
  useEffect(() => {
    if (isLoading) return
    const fetchedStats = user.getStats()
    setStats(fetchedStats)
  }, [isLoading])

  if (isLoading || stats === null) return <Copy>Loading...</Copy>
  if (error) return <ErrorMessage>Unable to load user details.</ErrorMessage>

  return (
    <div>
      <PostGameStats postGame={postGame} />
      <div>
        <StatBlock
          subtitle="Overall Correct Percentage"
          largeText={`${getPercentageCorrect(
            stats.questionsAnsweredCorrectly,
            stats.questionsSeen
          )}%`}
        />
        <VertSpace size={5} />
        <FlexEven>
          <StatBlock
            subtitle="Total Questions Seen"
            largeText={stats.questionsSeen}
          />
          <StatBlock
            subtitle="Total Questions Answered Correctly"
            largeText={stats.questionsAnsweredCorrectly}
          />
        </FlexEven>
        <VertSpace size={5} />
        <GameHistory stats={stats} />
      </div>
    </div>
  )
}

// Game-specific stats to display
// Returns nothing if no postGame object is supplied
const PostGameStats = ({ postGame }) => (
  <>
    {/* Conditional post-game stats, only if they're supplied */}
    {postGame !== null && (
      <div>
        <FlexEven>
          <StatBlock
            subtitle="Questions Seen This Game"
            largeText={postGame.seen}
          />
          <StatBlock
            subtitle="Correct Answers This Game"
            largeText={postGame.correct}
          />
          <StatBlock
            subtitle="This Game Correct Percentage"
            largeText={`${getPercentageCorrect(
              postGame.correct,
              postGame.seen
            )}%`}
          />
        </FlexEven>
        <VertSpace size={5} />
      </div>
    )}
  </>
)

const GameHistory = ({ stats }) => (
  <div>
    <SubtitleText>Your Game History</SubtitleText>
    <VertSpace size={4} />
    {/* Empty state when no games have been played yet */}
    {stats.results.length <= 0 ? (
      <Copy>No games played yet!</Copy>
    ) : (
      <div>
        <ColumnLayout>
          <ColumnHeading>Date</ColumnHeading>
          <ColumnHeading>Category</ColumnHeading>
          <ColumnHeading>Questions Seen</ColumnHeading>
          <ColumnHeading>Correct Answers</ColumnHeading>
          <ColumnHeading>Percentage Correct</ColumnHeading>
        </ColumnLayout>
        {stats.results.map(r => {
          const date = new Date(r.date)
          return (
            <div>
              <VertSpace size={2} />
              <ColumnLayout key={r.date}>
                <Copy center>
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </Copy>
                <Copy center>{r.categoryName}</Copy>
                <Copy center>{r.questionsSeen}</Copy>
                <Copy center>{r.answeredCorrectly}</Copy>
                <Copy center>
                  {getPercentageCorrect(r.answeredCorrectly, r.questionsSeen)}%
                </Copy>
              </ColumnLayout>
            </div>
          )
        })}
      </div>
    )}
  </div>
)

export default Stats
