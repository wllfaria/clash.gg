import { PasswordValidatorChainHandler } from '.'
import { InvalidParamError, MissingParamError } from '../utils/errors'

function makeSut() {
	const sut = new PasswordValidatorChainHandler()
	return { sut }
}

describe('PasswordValidatorChainHandler', () => {
	it('Should throw if password is too short', () => {
		const { sut } = makeSut()
		const data = { password: 'short' }

		expect(() => {
			sut.handle(data)
		}).toThrow(new InvalidParamError('password', 'password must be at least 8 characters long'))
	})

	it('Should throw if password is not provided', () => {
		const { sut } = makeSut()
		const data = {}

		expect(() => {
			sut.handle(data)
		}).toThrow(new MissingParamError('password'))
	})

	it('Should not throw if password is valid', () => {
		const { sut } = makeSut()
		const data = { password: 'valid_password' }

		expect(() => {
			sut.handle(data)
		}).not.toThrow()
	})
})
