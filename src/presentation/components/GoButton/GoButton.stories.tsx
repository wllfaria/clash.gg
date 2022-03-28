import { ComponentStory } from '@storybook/react'
import { GoButton } from '.'

export default {
	title: 'Components/GoButton',
	component: GoButton,
	argTypes: {
		onClick: { action: 'clicked' }
	}
}

const Template: ComponentStory<typeof GoButton> = args => <GoButton {...args} />

export const Enabled = Template.bind({})
Enabled.args = {
	disabled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true
}
