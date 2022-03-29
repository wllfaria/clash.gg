export interface Crypto {
	hash(rawString: string): Promise<string>
	compare(rawString: string, hashedString: string): Promise<boolean>
}
