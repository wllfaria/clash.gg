import { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { GoButton } from '@/components/GoButton'
import { Input } from '@/components/Input'
import { Form } from '@/components/Form'
import { Text } from '@/components/Text/Text'
import { NavBar } from '@/components/NavBar'
import { LoginFactory } from 'main/LoginFactory'
import { LoginDto } from '@/domain/dtos/loginDto'
import { InvalidParamError, MissingParamError } from '@/utils/errors'

import * as S from '@/styles/pages/loginPage'

export default function LoginPage() {
	const formRef = useRef<FormHandles>(null)

	const doLogin = async (loginDto: LoginDto) => {
		try {
			const authenticator = LoginFactory.make()
			await authenticator.login(loginDto)
		} catch (err) {
			if (err instanceof InvalidParamError) formRef.current?.setErrors({ [err.field]: err.message })
			if (err instanceof MissingParamError) formRef.current?.setErrors({ [err.field]: err.message })
		}
	}

	return (
		<>
			<NavBar />
			<S.AuthPageContainer>
				<S.AuthCard>
					<S.TitleContainer>
						<Text textNode="h1">Login</Text>
					</S.TitleContainer>
					<Form onSubmit={doLogin} ref={formRef}>
						<Input placeholder="Username" type="text" name="username" full />
						<Input placeholder="Password" type="password" name="password" full />
						<S.AuthGoButtonContainer>
							<GoButton type="submit" />
						</S.AuthGoButtonContainer>
					</Form>
				</S.AuthCard>
				<S.AuthIllustration src="/images/auth-illustration.png" />
			</S.AuthPageContainer>
		</>
	)
}
