import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import * as S from './styles'

export type GoButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export function GoButton({ disabled, type, onClick }: GoButtonProps) {
	return (
		<S.GoButton type={type} disabled={disabled} onClick={onClick}>
			{'->'}
		</S.GoButton>
	)
}
