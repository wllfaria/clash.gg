import { FormHandles, SubmitHandler } from '@unform/core'
import { Form as Unform } from '@unform/web'
import { ForwardedRef, forwardRef } from 'react'

type FormProps = {
	children: React.ReactNode
	onSubmit: SubmitHandler<any>
}

export const Form = forwardRef(({ children, onSubmit }: FormProps, ref: ForwardedRef<FormHandles>) => {
	return (
		<Unform onSubmit={onSubmit} ref={ref}>
			{children}
		</Unform>
	)
})
