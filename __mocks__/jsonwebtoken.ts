import jwt from 'jsonwebtoken'

export default {
	token: 'correct_token',
	sign(_payload: string | object | Buffer, _secretOrPrivateKey: jwt.Secret, _options?: jwt.SignOptions | undefined) {
		return this.token
	}
}
