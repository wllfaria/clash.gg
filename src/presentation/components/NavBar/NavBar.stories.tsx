import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NavBar } from '.'

export default {
	title: 'Components/NavBar',
	component: NavBar
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = () => <NavBar />

export const Default = Template.bind({})
