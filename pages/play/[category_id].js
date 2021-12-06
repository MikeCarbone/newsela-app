import Link from 'next/link'

import Button from '@/components/atoms/Button'
import CategoryInfoDisplay from '@/components/organisms/CategoryInfoDisplay'
import Heading from '@/components/atoms/Heading'
import Page from '@/components/templates/Page'
import VertSpace from '@/components/atoms/VertSpace'

export async function getServerSideProps(context) {
	return {
		props: {
			categoryId: context.params.category_id,
			categoryName: context.query.title,
		},
	}
}

export default function Play({ categoryId, categoryName }) {
	return (
		<Page>
			<Heading>{categoryName}</Heading>
			<VertSpace size={5} />
			<CategoryInfoDisplay categoryId={categoryId} />
			<VertSpace size={3} />
			<Link href="/">
				<a>
					<Button>Play</Button>
				</a>
			</Link>
			<Link href="/">
				<a>
					<Button secondary>Go Back</Button>
				</a>
			</Link>
		</Page>
	)
}
