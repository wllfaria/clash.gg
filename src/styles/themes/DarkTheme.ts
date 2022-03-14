import { DefaultTheme } from 'styled-components'
import FixedStyles from '@/styles/themes/FixedStyles'

const darkTheme: DefaultTheme = {
	title: 'Dark',

	colors: {
		primary: {
			...FixedStyles.colors.primary
		},
		accent: {
			...FixedStyles.colors.accent
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
			...FixedStyles.colors.danger
		},
		success: {
			...FixedStyles.colors.danger
		}
	},

	fontSizes: {
		...FixedStyles.fontSizes
	},

	margins: {
		...FixedStyles.margins
	},

	paddings: {
		...FixedStyles.paddings
	},

	borderRadius: {
		...FixedStyles.borderRadius
	},

	breakpoints: {
		...FixedStyles.breakpoints
	}
}

export default darkTheme
