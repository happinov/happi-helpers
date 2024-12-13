
import _ from 'lodash'

export default {
	create(message,details,cause) {
		const error = new Error(message)
		error.isUserError = true
		if (details) error.details = details
		if (cause) error.cause = cause
		return error
	},

	createStatus(statusCode,message) {
		const error = new Error(message)
		error.isUserError = true
		error.statusCode = statusCode
		return error
	},

	isUserError(err) {
		return _.isError(err) && err.isUserError
	},
}
