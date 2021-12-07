import { useState, useEffect } from 'react'
import useUser from '@/libs/hooks/useUser'

import Copy from '@/components/atoms/Copy'
import ErrorMessage from '@/components/atoms/ErrorMessage'

const Stats = () => {
  const [stats, setStats] = useState(null)
  const { user, isLoading, error } = useUser()

  useEffect(() => {
    if (isLoading) return
    const fetchedStats = user.getStats()
    setStats(fetchedStats)
  }, [isLoading])

  const getPercentageCorrect = (correct, total) => {
    return Number((correct / total) * 100).toFixed(1)
  }

  if (isLoading || stats === null) return <Copy>Loading...</Copy>
  if (error) return <ErrorMessage>Unable to load user details.</ErrorMessage>

  return (
    <div>
      <h3>Total Questions Seen: {stats.questionsSeen}</h3>
      <h3>
        Total Questions Answered Correctly: {stats.questionsAnsweredCorrectly}
      </h3>
      <h3>
        Percentage:{' '}
        {getPercentageCorrect(
          stats.questionsAnsweredCorrectly,
          stats.questionsSeen
        )}
        %
      </h3>
      <h3>Your Game History:</h3>
      {stats.results.map(r => {
        const date = new Date(r.date)
        return (
          <div
            key={r.date}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Copy>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </Copy>
            <Copy>{r.categoryName}</Copy>
            <Copy>{r.questionsSeen}</Copy>
            <Copy>{r.answeredCorrectly}</Copy>
            <Copy>
              {getPercentageCorrect(r.answeredCorrectly, r.questionsSeen)}%
            </Copy>
          </div>
        )
      })}
    </div>
  )
}

export default Stats
