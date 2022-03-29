import { mongoose } from '@typegoose/typegoose'

export class Database {
	private static instance: Database | null

	private static connection: typeof mongoose

	static getInstance(): Database {
		if (Database.instance === null) {
			Database.instance = new Database()
		}
		return Database.instance
	}

	private static connect = async () => {
		if (Database.connection) return
		Database.connection = await mongoose.connect(process.env.DB_URI as string)
	}

	public static async getConnection() {
		await this.connect()
		return this.connection
	}
}
