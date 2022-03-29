import { PasswordValidatorChainHandler, UsernameValidatorChainHandler } from '../../validations'
import { LoginRouter } from '../../presentation/routers/loginRouter'
import { ApiLoginUseCase } from '../../domain/useCases/api/apiLoginUseCase'
import { MongoUserRepository } from '../../infra/repositories/mongoUserRepository'
import { ArgonCrypto } from '../../infra/argonCrypto'
import { JwtToken } from '../../infra/jwtToken'
import { Database } from '../../database/database'

export class ApiLoginFactory {
	public static async make() {
		const validatorChain = ApiLoginFactory.validators
		await ApiLoginFactory.databaseConnection()
		const userRepository = await ApiLoginFactory.userRepository()
		const cryptoHelper = ApiLoginFactory.cryptoHelper
		const tokenHelper = ApiLoginFactory.tokenHelper
		const loginUseCase = new ApiLoginUseCase(validatorChain, userRepository, cryptoHelper, tokenHelper)
		return new LoginRouter(loginUseCase, validatorChain)
	}

	private static get validators() {
		const usernameValidator = new UsernameValidatorChainHandler()
		const passwordValidator = new PasswordValidatorChainHandler()
		usernameValidator.setNext(passwordValidator)
		return usernameValidator
	}

	private static async databaseConnection() {
		Database.getInstance()
		await Database.getConnection()
	}

	private static async userRepository() {
		return new MongoUserRepository()
	}

	private static get cryptoHelper() {
		return new ArgonCrypto()
	}

	private static get tokenHelper() {
		return new JwtToken()
	}
}
