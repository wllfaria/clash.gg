import { prop, getModelForClass } from '@typegoose/typegoose'
import { BaseModel } from './baseModel'

export class UserSchema extends BaseModel {
	@prop({ type: () => String, required: true })
	public password: string

	@prop({ type: () => String, required: true, unique: true })
	public username: string

	@prop({ type: () => String, required: true, unique: true })
	public email: string
}

export const UserModel = getModelForClass(UserSchema, { schemaOptions: { timestamps: true } })
