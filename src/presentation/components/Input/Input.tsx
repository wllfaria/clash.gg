import React, { DetailedHTMLProps, InputHTMLAttributes, RefObject, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import * as S from './styles'

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	name: string
	hasError?: boolean
	full?: boolean
}

export function Input({ placeholder, name, type, hasError, disabled, full }: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const { fieldName, registerField, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef,
			getValue: (ref: RefObject<HTMLInputElement>) => ref.current?.value ?? '',
			setValue: (ref: RefObject<HTMLInputElement>, value: string) => {
				ref.current && (ref.current.value = value)
			},
			clearValue: (ref: RefObject<HTMLInputElement>) => {
				ref.current && (ref.current.value = '')
			}
		})
	}, [fieldName, registerField])

	return (
		<S.InputContainer>
			<S.Input
				data-testid={name}
				ref={inputRef}
				full={full}
				type={type}
				hasError={!!error || !!hasError}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
			/>
			{!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
		</S.InputContainer>
	)
}
