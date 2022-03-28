import { LoginDto } from '../dtos/loginDto'

export interface LoginUseCase {
	login(loginData: LoginDto): Promise<unknown>
}
