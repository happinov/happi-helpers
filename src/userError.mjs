
class UserError extends Error {
	static isUserError(err) {
		return err instanceof UserError
	}

	constructor(message,details,cause) {
		super(message)

		this.details = details
		this.cause = cause
	}
}

export default UserError
