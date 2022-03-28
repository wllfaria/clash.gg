import { ChainHandler } from '../contracts/chainHandler'

export abstract class AbstractChainHandler implements ChainHandler {
	nextHandler: ChainHandler | undefined

	public setNext(chainHandler: ChainHandler) {
		this.nextHandler = chainHandler
		return chainHandler
	}

	public handle(request: Record<string, unknown>) {
		if (this.nextHandler) return this.nextHandler.handle(request)
		return null
	}
}
