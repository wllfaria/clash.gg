import { DefaultTheme } from 'styled-components'
type ExcludedProps = 'text' | 'background'

type PartialTheme<T> = {
	[K in keyof T]: Omit<T[K], ExcludedProps>
}

export const fixedStyles: PartialTheme<DefaultTheme> = {
	title: '',

	colors: {
		primary: {
			100: '#FFD500',
		},
		accent: {
			100: '#00509D'
		},
		danger: {
			100: '#E40010',
			200: '#A1000B',
			300: '#FB5560',
		},
		success: {
			100: '#00B32C',
			200: '#0A8027',
			300: '#24EA55',
		}
	},

	fontSizes: {
		1: '5rem',
		2: '3.5rem',
		3: '3rem',
		4: '2.5rem',
		5: '2rem',
		6: '1.5rem',
		7: '1.2rem'
	},

	margins: {
		0: '0.5rem',
		1: '1rem',
		2: '2rem',
		3: '3rem',
		4: '4rem',
		5: '5rem',
		6: '6rem',
		7: '7rem',
		8: '8rem',
		9: '9rem',
		10: '10rem'
	},

	paddings: {
		0: '0.5rem',
		1: '1rem',
		2: '2rem',
		3: '3rem',
		4: '4rem',
		5: '5rem',
		6: '6rem',
		7: '7rem',
		8: '8rem',
		9: '9rem',
		10: '10rem'
	},

	borderRadius: {
		0: '0.5rem',
		1: '1rem',
		2: '2rem',
		3: '3rem',
		4: '4rem',
		5: '5rem',
		6: '6rem',
		7: '7rem',
		8: '8rem',
		9: '9rem',
		10: '10rem'
	},

	breakpoints: {
		sm: '450px',
		md: '768px',
		lg: '1150px',
		xl: '1440px'
	}
}
