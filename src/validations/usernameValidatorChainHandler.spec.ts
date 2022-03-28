import { UsernameValidatorChainHandler } from '.'
import { InvalidParamError, MissingParamError } from '../utils/errors'

function makeSut() {
	const sut = new UsernameValidatorChainHandler()
	return { sut }
}

describe('UsernameValidatorChainHandler', () => {
	it('Should throw if username is too short', () => {
		const { sut } = makeSut()
		const data = { username: 'no' }

		expect(() => {
			sut.handle(data)
		}).toThrow(new InvalidParamError('username must be at least 3 characters long'))
	})

	it('Should throw if username is too long', () => {
		const { sut } = makeSut()
		const data = { username: 'too_long_username_provided' }

		expect(() => {
			sut.handle(data)
		}).toThrow(new InvalidParamError('username must be at most 24 characters long'))
	})

	it('Should throw if username is not provided', () => {
		const { sut } = makeSut()
		const data = {}

		expect(() => {
			sut.handle(data)
		}).toThrow(new MissingParamError('username'))
	})

	it('Should not throw if username is valid', () => {
		const { sut } = makeSut()
		const data = { username: 'valid_username' }

		expect(() => {
			sut.handle(data)
		}).not.toThrow()
	})
})
