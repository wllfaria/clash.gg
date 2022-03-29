import jwt from 'jsonwebtoken'
import { JwtToken } from './jwtToken'

function makeSut() {
	const sut = new JwtToken()
	return { sut }
}

describe('JwtToken', () => {
	it('Should sign a payload into a signed string if jwt signs correctly', () => {
		const { sut } = makeSut()
		const payload = { data: 'any_data' }

		const token = sut.sign(payload)

		expect(token).toBe('correct_token')
		expect(token).toBe((jwt as any).token)
	})
})
