import { DetailedHTMLProps, InputHTMLAttributes, RefObject, useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import * as S from './styles'

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	name: string
	hasError?: boolean
}

export function Input({ placeholder, name, type, hasError, disabled }: InputProps) {
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
			},
		})
	}, [fieldName, registerField])

	return (
		<S.InputContainer>
			<S.Input ref={inputRef} type={type} hasError={!!error || !!hasError} name={name} placeholder={placeholder} disabled={disabled} />
			{!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
		</S.InputContainer>
	)
}
