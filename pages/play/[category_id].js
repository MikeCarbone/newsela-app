import Link from 'next/link'

import Button from '@/components/atoms/Button'
import CategoryInfoDisplay from '@/components/organisms/CategoryInfoDisplay'
import Wrapper from '@/components/templates/Wrapper'

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
		<main>
			<Wrapper>
				<Link href="/">
					<a>
						<Button>Go back</Button>
					</a>
				</Link>
				<h1>{categoryName}</h1>
				<CategoryInfoDisplay categoryId={categoryId} />
			</Wrapper>
		</main>
	)
}
