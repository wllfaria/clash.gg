import { UserModel } from '../../database/models/userModel'
import { UserRepository } from '../../domain/contracts/userRepository'
import { RegisterDto } from '../../domain/dtos/registerDto'
import { User } from '../../domain/types/user'
import { DatabaseError } from '../../utils/errors'

export class MongoUserRepository implements UserRepository {
	public async findOneByUsername(username: string): Promise<User | null> {
		const user = await UserModel.findOne({ username })
		return user
	}

	public async insert({ username, password, email }: RegisterDto): Promise<User | undefined> {
		try {
			const user = await UserModel.create({ username, password, email })
			return user
		} catch (err) {
			if (err instanceof Error) throw new DatabaseError(`user with username ${username} is already registered`)
		}
	}
}
