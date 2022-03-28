import styled from 'styled-components'

export const NavBar = styled.nav`
	padding: ${props => props.theme.paddings[1]};
	height: 5rem;
	width: 100%;
	background: ${props => props.theme.colors.background.accent};
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		justify-content: unset;
	}
`

export const Logo = styled.p`
	font-size: ${props => props.theme.fontSizes[4]};
	font-weight: bold;
	color: ${props => props.theme.colors.text[100]};
`
