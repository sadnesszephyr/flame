import type { HandleClientError } from '@sveltejs/kit'

export const handleError: HandleClientError = async (error) => {
	return error
}
