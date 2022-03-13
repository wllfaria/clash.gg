import { DefaultTheme } from 'styled-components'
import FixedStyles from './FixedStyles'

const lightTheme: DefaultTheme = {
	title: 'Light',

	colors: {
		primary: {
			...FixedStyles.colors.primary
		},
		accent: {
			...FixedStyles.colors.accent
		},
		background: {
			100: '#EDF2F4',
			white: '#FFFFFF',
			black: '#000000'
		},
		text: {
			100: '#181924',
			200: '#2B2D42',
			300: '#8D99AE',
		},
		danger: {
			...FixedStyles.colors.danger
		},
		success: {
			...FixedStyles.colors.success
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

export default lightTheme
