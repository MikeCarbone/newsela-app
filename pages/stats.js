import { useEffect, useState } from 'react'

import useUser from '@/libs/hooks/useUser'
import triviaApi from '@/libs/triviaApi'

import CategoryButton from '@/components/atoms/CategoryButton'
import ErrorMessage from '@/components/atoms/ErrorMessage'
import Heading from '@/components/atoms/Heading'
import Page from '@/components/templates/Page'
import Stats from '@/components/templates/Stats'

export default function StatsPage() {
  return (
    <Page>
      <Heading>Your Stats</Heading>
      <Stats />
    </Page>
  )
}
