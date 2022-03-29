export class MissingParamError extends Error {
	public field: string

	constructor(fieldName: string) {
		super(`${fieldName} is a required field`)
		this.name = 'MissingParamError'
		this.field = fieldName
	}
}
