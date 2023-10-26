export const fetchNode = async (url, params = {}) => {
	const response = await fetch(url, params)
    if (!response.ok) {
        const error = new Error();
        error.status = response.status;
        error.message = await response.text();
        throw error
    }

	return response
}

export const authenticatedFetchNode = async (url, params = {}) => {
    params.headers = {
        ...params.headers,
        // "Authorization": `Bearer ${session.token}`
    }
	const response = await fetch(url, params)
    if (!response.ok) {
        const error = new Error();
        error.status = response.status;
        error.message = await response.text();
        throw error
    }

	return response
}