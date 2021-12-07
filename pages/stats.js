import Heading from '@/components/atoms/Heading'
import Page from '@/components/templates/Page'
import Stats from '@/components/organisms/Stats'
import VertSpace from '@/components/atoms/VertSpace'

export default function StatsPage() {
  return (
    <Page>
      <Heading>Your Stats</Heading>
      <VertSpace size={5} />
      <Stats />
    </Page>
  )
}
