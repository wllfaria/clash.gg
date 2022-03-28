import { GoButton } from '@/components/GoButton'
import { Input } from '@/components/Input'
import { Form } from '@unform/web'

import * as S from '@/styles/pages/loginPage'
import { Text } from '@/components/Text/Text'
import { NavBar } from '@/components/NavBar'

export default function LoginPage() {
	return (
		<>
			<NavBar />
			<S.AuthPageContainer>
				<S.AuthCard>
					<S.TitleContainer>
						<Text textNode="h1">Login</Text>
					</S.TitleContainer>
					<Form onSubmit={() => null}>
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
