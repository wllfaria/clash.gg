import argon2 from 'argon2'
import { Crypto } from '../domain/contracts/crypto'
import { CryptoError } from '../utils/errors'

export class ArgonCrypto implements Crypto {
	async compare(rawString: string, hashedString: string): Promise<boolean> {
		try {
			return await argon2.verify(hashedString, rawString)
		} catch (_) {
			throw new CryptoError("Plain string doesn't match hashed string")
		}
	}

	async hash(rawString: string): Promise<string> {
		try {
			return await argon2.hash(rawString)
		} catch (_) {
			throw new CryptoError('There was an error hashing the provided string')
		}
	}
}
