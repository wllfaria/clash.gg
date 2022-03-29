import { User } from '../types/user'

export type AuthDto = {
	data?: User
	token?: string
}
