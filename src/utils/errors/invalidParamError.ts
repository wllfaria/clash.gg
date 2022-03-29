export class InvalidParamError extends Error {
	public field: string

	constructor(fieldName: string, message: string) {
		super(message)
		this.name = 'InvalidParamError'
		this.field = fieldName
	}
}
