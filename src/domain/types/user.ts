import { UserSchema } from '../../database/models/userModel'
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type User = PartialBy<UserSchema, 'password'>
