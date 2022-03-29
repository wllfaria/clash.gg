import { prop, mongoose } from '@typegoose/typegoose'

export abstract class BaseModel {
	@prop({ type: () => mongoose.Types.ObjectId, auto: true })
	public _id: mongoose.Types.ObjectId

	@prop({ type: () => Number })
	public __v: number

	@prop({ type: () => String })
	public __t: string | undefined
}
