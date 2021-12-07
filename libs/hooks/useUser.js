import router from 'next/router'
import config from '@/libs/config'
import User from '@/libs/models/User'

// This will be a hook that gets our user from local storage
function useUser() {
  // We can't access window if rendering on the server, so let's return a loading state
  if (typeof window === 'undefined') {
    return {
      user: null,
      isLoading: false,
      error: true,
      errorDetails: 'Not attempting to access localStorage on server',
    }
  }

  // Fetch from local storage
  const userData = JSON.parse(
    window.localStorage.getItem(config.USER_KEY_LOCAL_STORAGE)
  )

  // Redirect if no user is there
  if (!userData) {
    router.push('/register')

    // Let's still return something so we don't run into Next.js server != local error
    return {
      user: null,
      isLoading: false,
      error: true,
      errorDetails: 'Redirecting to registration...',
    }
  }

  // Format the data into our usable object
  const userObject = new User(userData)
  return {
    user: userObject,
    isLoading: false,
    error: null,
  }
}

export default useUser
