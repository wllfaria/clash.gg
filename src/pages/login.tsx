import { Input } from '@/components/Input'
import { Form } from '@unform/web'

export default function LoginPage() {
	return (
		<Form onSubmit={() => null}>
			<Input placeholder="asda" type="password" name="test" />
		</Form>
	)
}
