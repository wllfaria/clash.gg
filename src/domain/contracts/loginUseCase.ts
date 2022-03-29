import { AuthDto } from '../dtos/authDto'
import { LoginDto } from '../dtos/loginDto'

export interface LoginUseCase {
	login(loginData: LoginDto): Promise<AuthDto | null>
}
