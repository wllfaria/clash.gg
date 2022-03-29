import { mongoose } from '@typegoose/typegoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export class MongoTestDatabase {
	public static mongod: MongoMemoryServer

	public static async start() {
		MongoTestDatabase.mongod = await MongoMemoryServer.create()
		const uri = MongoTestDatabase.mongod.getUri()
		await mongoose.connect(uri)
	}

	public static async stop() {
		await mongoose.connection.dropDatabase()
		await mongoose.connection.close()
		await MongoTestDatabase.mongod.stop()
	}

	public static async truncate() {
		const collections = mongoose.connection.collections

		for (const key in collections) {
			const collection = collections[key]
			await collection.deleteMany({})
		}
	}
}
