export class InvalidParamError extends Error {
	constructor(fieldName: string) {
		super(`Invalid param: ${fieldName}`)
		this.name = 'InvalidParamError'
	}
}
