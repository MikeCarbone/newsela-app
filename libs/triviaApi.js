// Interface for working with the API
// You can read more about the documentation here:
// https://opentdb.com/api_config.php
const API = {
	getCategories: () => fetch('https://opentdb.com/api_category.php').then(r => r.json()).catch(e => Promise.reject(e)),
    getSessionToken: () => fetch('https://opentdb.com/api_token.php?command=request').then(r => r.json()).catch(e => Promise.reject(e)),
    getCategoryInfo: (id) => fetch(`https://opentdb.com/api_count.php?category=${id}`).then(r => r.json()).catch(e => Promise.reject(e)),
    getQuestions: (sessionToken, categoryId) => fetch(`https://opentdb.com/api.php?amount=20&category=${categoryId}&token=${sessionToken}`).then(r => r.json()).catch(e => Promise.reject(e)),
    resetSessionToken: (sessionToken) => fetch(`https://opentdb.com/api_token.php?command=reset&token=${sessionToken}`).then(r => r.json()).catch(e => Promise.reject(e)),
}

export default API
