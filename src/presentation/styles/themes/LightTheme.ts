import { DefaultTheme } from 'styled-components'
import { fixedStyles } from './FixedStyles'

export const lightTheme: DefaultTheme = {
	title: 'Light',

	colors: {
		primary: {
			...fixedStyles.colors.primary
		},
		accent: {
			...fixedStyles.colors.accent
		},
		background: {
			100: '#EDF2F4',
			white: '#FFFFFF',
			black: '#000000',
			accent: '#000000'
		},
		text: {
			100: '#181924',
			200: '#2B2D42',
			300: '#8D99AE'
		},
		danger: {
			...fixedStyles.colors.danger
		},
		success: {
			...fixedStyles.colors.success
		}
	},

	fontSizes: {
		...fixedStyles.fontSizes
	},

	margins: {
		...fixedStyles.margins
	},

	paddings: {
		...fixedStyles.paddings
	},

	borderRadius: {
		...fixedStyles.borderRadius
	},

	breakpoints: {
		...fixedStyles.breakpoints
	}
}
