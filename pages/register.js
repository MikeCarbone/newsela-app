import { useForm } from 'react-hook-form'
import router from 'next/router'

import User from '@/libs/models/User'

import Button from '@/components/atoms/Button'
import Heading from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import Wrapper from '@/components/templates/Wrapper'
import VertSpace from '@/components/atoms/VertSpace'

export default function Register() {
	const { register, handleSubmit } = useForm()

	// Function after submit is clicked
	// Create a new user and redirect to main screen
	const onSubmit = ({ firstName }) => {
		const newUser = new User({ firstName })
		router.push('/')
		return
	}

	return (
		<main>
			<Wrapper>
				<Heading>Let's play some Trivia!</Heading>
				<VertSpace size={3} />
				<p>
					Please enter your name to get started. We'll use
					localStorage to track your progress.
				</p>
				<VertSpace size={5} />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						registration={register('firstName', { required: true })}
						domProps={{ placeholder: 'Mike' }}
						labelText="First Name"
						identifier="register__first-name"
					/>
					<Button domProps={{ type: 'submit' }}>Save</Button>
				</form>
			</Wrapper>
		</main>
	)
}
