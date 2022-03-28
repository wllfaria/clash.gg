import React from 'react'
import { render } from '@testing-library/react'
import { GoButton, GoButtonProps } from '.'
import { AppThemeState } from '../../../states/AppThemeState'
import { darkTheme, fixedStyles, lightTheme } from '../../styles'
import { rgbToHex, getRgbValues } from '../../../../tests/testUtils'
import { DefaultTheme } from 'styled-components'

const makeSut = (props?: GoButtonProps, theme?: DefaultTheme) => (
	<AppThemeState theme={theme}>
		<GoButton {...props} />
	</AppThemeState>
)

describe('GoButton', () => {
	it('Should render an enabled button with correct styles on dark theme', () => {
		const { getByRole } = render(makeSut({}, darkTheme))
		const styles = getComputedStyle(getByRole('button'))
		const backgroundHex = rgbToHex(getRgbValues(styles.background))
		const colorHex = rgbToHex(getRgbValues(styles.color))

		expect(backgroundHex).toEqual(fixedStyles.colors.primary[100].toLowerCase())
		expect(styles.height).toBe('10rem')
		expect(styles.width).toBe('10rem')
		expect(colorHex).toEqual(darkTheme.colors.background.white.toLowerCase())
		expect(styles.borderRadius).toBe(fixedStyles.borderRadius[3])
		expect(styles.borderWidth).toBe('0.2rem')
	})

	it('Should render an disabled button with correct styles on dark theme', () => {
		const { getByRole } = render(makeSut({ disabled: true }, darkTheme))
		const styles = getComputedStyle(getByRole('button'))
		const colorHex = rgbToHex(getRgbValues(styles.color))

		expect(styles.background).toBe('transparent')
		expect(styles.height).toBe('10rem')
		expect(styles.width).toBe('10rem')
		expect(colorHex).toBe(darkTheme.colors.text[300].toLowerCase())
		expect(styles.borderColor).toBe(darkTheme.colors.text[300].toLowerCase())
		expect(styles.borderWidth).toBe('0.2rem')
		expect(styles.borderRadius).toBe(fixedStyles.borderRadius[3])
	})

	it('Should render an enabled button with correct styles on light theme', () => {
		const { getByRole } = render(makeSut({}, lightTheme))
		const styles = getComputedStyle(getByRole('button'))
		const backgroundHex = rgbToHex(getRgbValues(styles.background))
		const colorHex = rgbToHex(getRgbValues(styles.color))

		expect(backgroundHex).toEqual(fixedStyles.colors.primary[100].toLowerCase())
		expect(styles.height).toBe('10rem')
		expect(styles.width).toBe('10rem')
		expect(colorHex).toEqual(lightTheme.colors.background.white.toLowerCase())
		expect(styles.borderRadius).toBe(fixedStyles.borderRadius[3])
		expect(styles.borderWidth).toBe('0.2rem')
	})

	it('Should render an disabled button with correct styles on dark theme', () => {
		const { getByRole } = render(makeSut({ disabled: true }, lightTheme))
		const styles = getComputedStyle(getByRole('button'))
		const colorHex = rgbToHex(getRgbValues(styles.color))

		expect(styles.background).toBe('transparent')
		expect(styles.height).toBe('10rem')
		expect(styles.width).toBe('10rem')
		expect(colorHex).toBe(lightTheme.colors.text[300].toLowerCase())
		expect(styles.borderColor).toBe(lightTheme.colors.text[300].toLowerCase())
		expect(styles.borderWidth).toBe('0.2rem')
		expect(styles.borderRadius).toBe(fixedStyles.borderRadius[3])
	})
})
