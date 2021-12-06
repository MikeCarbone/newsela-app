import config from '@/libs/config'

class User {
	constructor(userDetails) {
		//
		// Sometimes we'll create a user from scratch, and sometimes we'll be creating a user from localStorage
		// `constructed` will be a key to denote that this information is coming
		// from a previously instantiated user object that has been saved to localStorage
		// We don't want to overwrite our user's stats everytime they load,
		// so if constructed is true, we skip over setting the default values and prevent overwriting
		//
		if (userDetails.constructed) {
			// Spread syntax not supported in object constructors using this
			Object.assign(this, userDetails)
			this.saveUser()
		} else {
			// Default instantiation values
			this.firstName = userDetails.firstName
			this.stats = { questionsAnswered: 0, questionsSeen: 0 }

			// Set constructed to true so we know not to reset these values
			this.constructed = true
			this.saveUser()
		}
	}

	// Returns formatted first name
	getFirstName() {
		return (
			this.firstName.slice(0, 1).toUpperCase() +
			this.firstName.slice(1).toLowerCase()
		)
	}

	saveUser() {
		const userDataAsString = JSON.stringify(this)
		return localStorage.setItem(
			config.USER_KEY_LOCAL_STORAGE,
			userDataAsString
		)
	}

	getSavedUser() {
		return JSON.parse(localStorage.getItem(config.USER_KEY_LOCAL_STORAGE))
	}

	// The API says we should use a session token to avoid getting questions we've already answered
	// Let's add a method that'll allow us to generate a session token and save it to our user
	// This isnt super critical, so if it fails lets not error out, we can return an empty string
	// https://opentdb.com/api_config.php
	static async fetchSessionToken() {
		try {
			const res = await fetch(
				'https://opentdb.com/api_token.php?command=request'
			).then(r => r.json())

			// If all is well, let's save the session token back to local storage
			if (res.response_code === 0) {
				this.sessionToken = res.token
				this.saveUser()
				return res.token
			} else {
				return ''
			}
		} catch (err) {
			return ''
		}
	}

	// A little memoization action to get a session token
	// If we have a token, return it. If not, let's generate a new one
	async getSessionToken() {
		if (this.sessionToken) {
			return this.sessionToken
		}
		const newToken = await this.fetchSessionToken()
		return newToken
	}
}

export default User
