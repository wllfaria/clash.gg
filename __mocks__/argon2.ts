import argon2 from 'argon2'

export default {
	isValid: true,
	hashedString: 'hashed_string',
	async verify(hash: string, plain: string | Buffer, _options?: argon2.Options | undefined) {
		if (hash === plain) return this.isValid
		throw new Error()
	},
	async hash(plainString: string) {
		if (plainString === 'error_string') throw new Error()
		return this.hashedString
	}
}
