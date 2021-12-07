import getRandomNumber from '@/libs/getRandomNumber'

// Loop through the elements in the array and swap with a random index
const shuffle = arr => {
	for (let i = 0; i < arr.length; i++) {
		// Get index of item we're going to trade places with
		const newPos = Math.floor(getRandomNumber(0, arr.length))
		const temp = arr[i]
		arr[i] = arr[newPos]
		arr[newPos] = temp
	}
	return arr
}

export default shuffle
