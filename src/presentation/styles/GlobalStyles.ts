import { createGlobalStyle } from 'styled-components'

export const globalStyles = createGlobalStyle`
	*,
	*::before,
	*::after {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	::-webkit-scrollbar {
		width: 0.7rem;
		height: 0.7rem;
		&-thumb {
			background: ${props => props.theme.colors.primary[100]};
		}
		&-track {
			background: ${props => props.theme.colors.background[100]};
		}
	}

	html {
		font-size: 10px;
	}

	body {
		background: ${props => props.theme.colors.background[100]};
		font-size: ${props => props.theme.fontSizes[7]};
		color: ${props => props.theme.colors.text[100]};
	}

	html,
	body {
		height: 100vh;
	}

	body,
	textarea,
	input {
		font-family: 'Open Sans', sans-serif;
		line-height: 1.7555555555555556;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		-moz-font-smoothing: antialiased;
		text-rendering: optimizelegibility;
		@media (min-width: ${props => props.theme.breakpoints.lg}) {
			line-height: 2;
		}
	}
`
