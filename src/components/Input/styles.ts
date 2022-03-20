import styled, { css } from 'styled-components'

type InputStyleProps = {
	hasError: boolean
}

export const InputContainer = styled.div`
	margin-bottom: ${props => props.theme.margins[1]};
`

export const Input = styled.input<InputStyleProps>`
	height: 5rem;
	outline: none;
	border: none;
	min-width: 30rem;
	font-weight: bold;
	color: ${props => props.theme.colors.text[100]};
	font-size: ${props => props.theme.fontSizes[6]};
	padding-left: ${props => props.theme.paddings[1]};
	padding-right: ${props => props.theme.paddings[1]};
	border-radius: ${props => props.theme.borderRadius[1]};
	background: ${props => props.theme.colors.background[100]};

	&::placeholder {
		color: ${props => props.theme.colors.text[300]};
	}

	&:focus {
		border: 0.2rem solid ${props => props.theme.colors.text[100] };
	}

	&:disabled {
		cursor: not-allowed;
	}

	${props => props.hasError && css`
		color: ${props.theme.colors.danger[100]};
		border: 0.2rem solid ${props.theme.colors.danger[100]};
	`}
`

export const ErrorMessage = styled.span`
	display: block;
	margin-top: ${props => props.theme.margins[0]};
	font-size: ${props => props.theme.fontSizes[7]};
	color: ${props => props.theme.colors.danger[100]};
`
