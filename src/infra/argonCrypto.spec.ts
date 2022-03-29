import argon2 from 'argon2'
import { CryptoError } from '../utils/errors'
import { ArgonCrypto } from './argonCrypto'

function makeSut() {
	const sut = new ArgonCrypto()
	return { sut }
}

describe('ArgonCrypto', () => {
	it('Should return true if argon returns true', async () => {
		const { sut } = makeSut()
		const rawString = 'any_string'
		const hashedString = 'any_string'

		const isValid = await sut.compare(rawString, hashedString)

		expect(isValid).toBe(true)
		expect(isValid).toBe((argon2 as any).isValid)
	})

	it("Should throw an error if hash don't match", async () => {
		const { sut } = makeSut()
		const rawString = 'any_string'
		const hashedString = 'wrong_string'

		expect(sut.compare(rawString, hashedString)).rejects.toThrow()
		expect(sut.compare(rawString, hashedString)).rejects.toEqual(
			new CryptoError("Plain string doesn't match hashed string")
		)
	})

	it('Should hash a raw string if argon hash completes', async () => {
		const { sut } = makeSut()
		const rawString = 'any_string'

		const hashedString = await sut.hash(rawString)

		expect(hashedString).toBe('hashed_string')
		expect(hashedString).toBe((argon2 as any).hashedString)
	})

	it('Should throw if argon fails', async () => {
		const { sut } = makeSut()
		const rawString = 'error_string'

		expect(sut.hash(rawString)).rejects.toThrow()
		expect(sut.hash(rawString)).rejects.toEqual(new CryptoError('There was an error hashing the provided string'))
	})
})
