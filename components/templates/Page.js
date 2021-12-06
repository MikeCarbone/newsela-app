import Header from '@/components/molecules/Header'
import Wrapper from '@/components/templates/Wrapper'

const Page = ({ children }) => {
	return (
		<>
			<Header />
			<main>
				<Wrapper>{children}</Wrapper>
			</main>
		</>
	)
}

export default Page
