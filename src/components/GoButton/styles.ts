import styled from 'styled-components'

export const GoButton = styled.button`
	width: 10rem;
	height: 10rem;
	font-size: ${props => props.theme.fontSizes[5]};
	color: ${props => props.theme.colors.background.white};
	border: 0.2rem solid ${props => props.theme.colors.primary[100]};
	background: ${props => props.theme.colors.primary[100]};
	border-radius: 3rem;
	cursor: pointer;

	&:disabled {
		color: ${props => props.theme.colors.text[300]};
		border-color: ${props => props.theme.colors.text[300]};
		background: transparent;
		cursor: not-allowed;
	}
`
