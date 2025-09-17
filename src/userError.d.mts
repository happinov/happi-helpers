
declare class UserError extends Error {
	static isUserError(err: Error): boolean;
	constructor(message:string, details?:any, cause?:Error);
}

export default UserError;
