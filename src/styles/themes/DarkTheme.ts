import { DefaultTheme } from 'styled-components'
import { fixedStyles } from './FixedStyles'

export const darkTheme: DefaultTheme = {
	title: 'Dark',

	colors: {
		primary: {
			...fixedStyles.colors.primary
		},
		accent: {
			...fixedStyles.colors.accent
		},
		background: {
			100: '#0B090A',
			white: '#FFFFFF',
			black: '#000000'
		},
		text: {
			100: '#F5F3F4',
			200: '#D3D3D3',
			300: '#A5A5A5',
		},
		danger: {
			...fixedStyles.colors.danger
		},
		success: {
			...fixedStyles.colors.danger
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
