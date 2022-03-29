import { MongoTestDatabase } from '../../database/testDatabase'
import { RegisterDto } from '../../domain/dtos/registerDto'
import { DatabaseError } from '../../utils/errors/databaseError'
import { MongoUserRepository } from './mongoUserRepository'

beforeAll(async () => await MongoTestDatabase.start())
afterEach(async () => await MongoTestDatabase.truncate())
afterAll(async () => await MongoTestDatabase.stop())

function makeSut() {
	const sut = new MongoUserRepository()
	return { sut }
}

function makeUser(): RegisterDto {
	return {
		username: 'valid_username',
		password: 'valid_password',
		email: 'valid_email@mail.com'
	}
}

describe('UserRepository', () => {
	it('Should return an user when provided a valid username', async () => {
		const { sut } = makeSut()
		const userData = makeUser()
		await sut.insert(userData)

		const user = await sut.findOneByUsername(userData.username)

		expect(user?.username).toBeDefined()
		expect(user?.username).toEqual('valid_username')
	})

	it('Should return null if no user is registered with provided username', async () => {
		const { sut } = makeSut()
		const invalidUsername = 'invalid_username'

		const user = await sut.findOneByUsername(invalidUsername)

		expect(user).toBeNull()
	})

	it('Should successfully register an user with valid data', async () => {
		const { sut } = makeSut()
		const userData = makeUser()
		const user = await sut.insert(userData)

		expect(user?.username).toBeDefined()
		expect(user?.username).toEqual('valid_username')
	})

	it('Should throw if user is already registered', async () => {
		const { sut } = makeSut()
		const userData = makeUser()

		await sut.insert(userData)
		sut.insert(userData)

		expect(async () => {
			await sut.insert(userData)
			await sut.insert(userData)
		}).rejects.toEqual(new DatabaseError(`user with username ${userData.username} is already registered`))
	})
})
