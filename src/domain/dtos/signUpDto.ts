import { LoginDto } from './loginDto'

export type SignUpDto = LoginDto & {
	email: string
}
