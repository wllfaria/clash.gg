import { Authenticator } from '../../domain/contracts/authenticator'
import { ChainHandler } from '../../domain/contracts/chainHandler'
import { HttpClient } from '../../data/contracts/httpClient'
import { RemoteAuthenticator } from '../../data/RemoteAuthenticator'
import { AxiosHttpClient } from '../../infra/axiosHttpClient'
import { PasswordValidatorChainHandler, UsernameValidatorChainHandler } from '../../validations'

export class AppLoginFactory {
	public static make() {
		const validatorChain = AppLoginFactory.validators
		const httpClient = AppLoginFactory.httpClient
		return AppLoginFactory.authenticator(validatorChain, httpClient)
	}

	private static get validators() {
		const usernameValidator = new UsernameValidatorChainHandler()
		const passwordValidator = new PasswordValidatorChainHandler()
		usernameValidator.setNext(passwordValidator)
		return usernameValidator
	}

	private static get httpClient() {
		return new AxiosHttpClient()
	}

	private static authenticator(validatorChain: ChainHandler, httpClient: HttpClient): Authenticator {
		return new RemoteAuthenticator(validatorChain, httpClient)
	}
}
