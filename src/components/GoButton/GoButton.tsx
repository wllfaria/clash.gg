import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import * as S from './styles'

type GoButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function GoButton({ disabled, onClick }: GoButtonProps) {
	return (
		<S.GoButton disabled={disabled} onClick={onClick}>
			{'->'}
		</S.GoButton>
	)
}
