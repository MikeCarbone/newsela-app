import { useForm } from 'react-hook-form'

import User from '@/libs/models/User'

import Wrapper from '@/components/templates/Wrapper'

export default function Register() {
	const { register, handleSubmit } = useForm()

	// Function after submit is clicked
	const onSubmit = ({ firstName }) => {
		const newUser = new User({ firstName })
		setUser(newUser)
	}

	return (
		<main>
			<Wrapper>
				<h1>Let's play some Trivia!</h1>
				<p>
					Please enter your name to get started. We'll use
					localStorage to track your progress.
				</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('firstName', { required: true })}
						placeholder="First name"
					/>
					<button type="submit">Save</button>
				</form>
			</Wrapper>
		</main>
	)
}
