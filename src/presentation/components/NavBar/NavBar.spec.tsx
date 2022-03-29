import React from 'react'
import { render } from '@testing-library/react'
import { DefaultTheme } from 'styled-components'
import { AppThemeState } from '../../../presentation/states/AppThemeState'
import { NavBar } from '.'
import { darkTheme, fixedStyles, lightTheme } from '../../styles'
import { rgbToHex, getRgbValues } from '../../../../tests/testUtils'

const makeSut = (theme: DefaultTheme) => {
	return (
		<AppThemeState theme={theme}>
			<NavBar />
		</AppThemeState>
	)
}

describe('NavBar', () => {
	it('Should render a NavBar with correct styles on dark theme', () => {
		const { getByTestId, getByText } = render(makeSut(darkTheme))
		const container = getByTestId('navbar-container')
		const logo = getByText('Clash.GG')

		const containerStyles = getComputedStyle(container)
		const containerBackground = rgbToHex(getRgbValues(containerStyles.background))
		const logoStyles = getComputedStyle(logo)
		const logoColor = rgbToHex(getRgbValues(logoStyles.color))

		expect(containerBackground).toBe(darkTheme.colors.background.accent.toLowerCase())
		expect(containerStyles.height).toBe('5rem')
		expect(logoColor).toBe(darkTheme.colors.text[100].toLowerCase())
		expect(logoStyles.fontSize).toBe(fixedStyles.fontSizes[4])
	})

	it('Should render a NavBar with correct styles on light theme', () => {
		const { getByTestId, getByText } = render(makeSut(lightTheme))
		const container = getByTestId('navbar-container')
		const logo = getByText('Clash.GG')

		const containerStyles = getComputedStyle(container)
		const containerBackground = rgbToHex(getRgbValues(containerStyles.background))
		const logoStyles = getComputedStyle(logo)
		const logoColor = rgbToHex(getRgbValues(logoStyles.color))

		expect(containerBackground).toBe(lightTheme.colors.background.accent.toLowerCase())
		expect(containerStyles.height).toBe('5rem')
		expect(logoColor).toBe(lightTheme.colors.text[100].toLowerCase())
		expect(logoStyles.fontSize).toBe(fixedStyles.fontSizes[4])
	})
})
