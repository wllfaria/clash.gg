import { LoginDto } from '@/domain/dtos/loginDto'
import { RegisterDto } from '../dtos/registerDto'

export interface Authenticator {
	login({ username, password }: LoginDto): Promise<unknown>
	register({ username, password, email }: RegisterDto): Promise<unknown>
}
