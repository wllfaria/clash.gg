import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Form } from '@unform/web'
import { Input } from '.'

export default {
	title: 'Components/Input',
	component: Input,
	argTypes: {
		type: {
			options: ['text', 'number', 'password'],
			defaultValue: 'text',
			control: { type: 'select' }
		}
	},
	decorators: [
		Story => (
			<Form onSubmit={() => null}>
				<Story />
			</Form>
		)
	]
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />

export const Normal = Template.bind({})
Normal.args = {
	name: 'normal',
	placeholder: 'Normal Input',
	type: 'text',
	hasError: false
}

export const Password = Template.bind({})
Password.args = {
	name: 'password',
	placeholder: 'Password Input',
	type: 'password',
	hasError: false
}

export const Error = Template.bind({})
Error.args = {
	name: 'error',
	placeholder: 'Error Input',
	type: 'text',
	hasError: true
}

export const Disabled = Template.bind({})
Disabled.args = {
	name: 'disabled',
	placeholder: 'Disabled Input',
	type: 'text',
	hasError: false,
	disabled: true
}
