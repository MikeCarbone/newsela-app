const API = {
	getCategories: () => fetch('https://opentdb.com/api_category.php').then(r => r.json()).catch(e => Promise.reject(e)),
    getSessionToken: () => fetch('https://opentdb.com/api_token.php?command=request').then(r => r.json()).catch(e => Promise.reject(e)),
    getCategoryInfo: (id) => fetch(`https://opentdb.com/api_count.php?category=${id}`).then(r => r.json()).catch(e => Promise.reject(e)),
}

export default API
