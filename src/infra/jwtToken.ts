import { Token } from '../domain/contracts/token'
import jwt from 'jsonwebtoken'

export class JwtToken implements Token {
	public sign(payload: string | object | Buffer) {
		return jwt.sign(payload, 'secret_key', { algorithm: 'HS512', expiresIn: '7d' })
	}
}
