import { RegisterDto } from '../dtos/registerDto'
import { User } from '../types/user'

export interface UserRepository {
	findOneByUsername(username: string): Promise<User | null | undefined>
	insert({ username, password, email }: RegisterDto): Promise<User | undefined>
}
