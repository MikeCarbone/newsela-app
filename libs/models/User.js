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
			this.stats = {
				questionsAnswered: 0,
				questionsSeen: 0,
			}
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
}

export default User
