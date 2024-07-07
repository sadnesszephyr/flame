import type { HandleClientError } from '@sveltejs/kit'

export const handleError: HandleClientError = async (error) => {
	alert(error.message)
	return error
}
