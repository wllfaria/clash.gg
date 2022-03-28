export interface ChainHandler {
	setNext(handler: ChainHandler): ChainHandler
	handle(request: Record<string, unknown>): unknown
}
