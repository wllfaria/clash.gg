import styled from 'styled-components'

export const AuthPageContainer = styled.main`
	width: 100%;
	height: calc(100vh - 5rem);
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${props => props.theme.paddings[1]};

	@media (min-width: ${props => props.theme.breakpoints.md}) {
		padding: ${props => props.theme.paddings[5]};
	}

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		padding: 0;
		background: url('/images/auth-background.jpg');
		background-position: center;
		background-size: cover;
	}
`

export const AuthCard = styled.div`
	padding: ${props => props.theme.paddings[2]};
	background: ${props => props.theme.colors.background.accent};
	border-radius: ${props => props.theme.borderRadius[1]};
	width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		width: 30%;
		position: absolute;
		top: 50%;
		left: 5%;
		transform: translateY(-50%);
	}

	@media (min-width: ${props => props.theme.breakpoints.xl}) {
		width: 35%;
	}
`

export const AuthGoButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: ${props => props.theme.margins[2]};
`

export const TitleContainer = styled.div`
	margin-bottom: ${props => props.theme.margins[1]};
`

export const AuthIllustration = styled.img`
	display: none;

	@media (min-width: ${props => props.theme.breakpoints.lg}) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`
