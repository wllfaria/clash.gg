import 'styled-components'

declare module '*.json' {
	const value: unknown
	export default value
}

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string

		colors: {
			primary: {
				100: string
			}

			accent: {
				100: string
			}

			background: {
				100: string
				white: string
				black: string
			}

			text: {
				100: string
				200: string
				300: string
			}

			danger: {
				100: string
				200: string
				300: string
			}

			success: {
				100: string
				200: string
				300: string
			}
		}

		fontSizes: {
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
		}

		margins: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
		}

		paddings: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
		}

		borderRadius: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
		}

		breakpoints: {
			sm: string
			md: string
			lg: string
			xl: string
		}
	}
}
