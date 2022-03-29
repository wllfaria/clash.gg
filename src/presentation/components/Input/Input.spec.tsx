import React from 'react'
import { AppThemeState } from '../../../presentation/states/AppThemeState'
import { Input, InputProps } from '.'
import { DefaultTheme } from 'styled-components'
import { darkTheme, fixedStyles, lightTheme } from '../../styles'
import { render } from '@testing-library/react'
import { Form } from '@unform/web'
import { getRgbValues, rgbToHex } from '../../../../tests/testUtils'

const makeSut = (props: InputProps, theme?: DefaultTheme) => (
	<AppThemeState theme={theme}>
		<Form onSubmit={() => null}>
			<Input {...props} />
		</Form>
	</AppThemeState>
)

describe('Input', () => {
	it('Should render an input with correct styles on dark theme', () => {
		const { getByTestId } = render(makeSut({ name: 'any_name' }, darkTheme))
		const input = getByTestId('any_name')

		const styles = getComputedStyle(input)
		const backgroundHex = rgbToHex(getRgbValues(styles.background))
		const colorHex = rgbToHex(getRgbValues(styles.color))

		expect(backgroundHex).toBe(darkTheme.colors.background[100].toLowerCase())
		expect(styles.height).toBe('5rem')
		expect(styles.fontSize).toBe(fixedStyles.fontSizes[6])
		expect(colorHex).toBe(darkTheme.colors.text[100].toLowerCase())
		expect(styles.border).toBe('')
	})

	it('Should render an input with correct styles on dark theme', () => {
		const { getByTestId } = render(makeSut({ name: 'any_name' }, lightTheme))
		const input = getByTestId('any_name')

		const styles = getComputedStyle(input)
		const backgroundHex = rgbToHex(getRgbValues(styles.background))
		const colorHex = rgbToHex(getRgbValues(styles.color))

		expect(backgroundHex).toBe(lightTheme.colors.background[100].toLowerCase())
		expect(styles.height).toBe('5rem')
		expect(styles.fontSize).toBe(fixedStyles.fontSizes[6])
		expect(colorHex).toBe(lightTheme.colors.text[100].toLowerCase())
		expect(styles.border).toBe('')
	})
})
