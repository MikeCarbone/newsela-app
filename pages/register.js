import { useForm } from 'react-hook-form'
import router from 'next/router'

import User from '@/libs/models/User'

import Button from '@/components/atoms/Button'
import Copy from '@/components/atoms/Copy'
import Heading from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import Page from '@/components/templates/Page'
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
    <Page>
      <Heading>Let&apos;s play some Trivia!</Heading>
      <VertSpace size={3} />
      <Copy>
        Please enter your name to get started. We&apos;ll use localStorage to
        track your progress.
      </Copy>
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
    </Page>
  )
}
