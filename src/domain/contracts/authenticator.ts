import { LoginDto } from '../../domain/dtos/loginDto'
import { AuthDto } from '../dtos/authDto'
import { RegisterDto } from '../dtos/registerDto'

export interface Authenticator {
	login({ username, password }: LoginDto): Promise<AuthDto>
	register({ username, password, email }: RegisterDto): Promise<AuthDto>
}
