export async function getServerSideProps(context) {
	return {
		props: {
			categoryId: context.params.category_id,
		},
	}
}

export default function Play({ categoryId }) {
	console.log(categoryId)

	return <h1>{categoryId}</h1>
}
