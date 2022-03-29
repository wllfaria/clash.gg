import { AppThemeConstants } from '../../utils'
import React, { createContext, ReactElement, useCallback, useEffect, useMemo, useReducer } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { globalStyles as GlobalStyles, darkTheme, lightTheme } from '../styles'

export type AppThemeInitialState = {
	theme: DefaultTheme
	toggleTheme: () => void
}

export type AppThemeStateProps = {
	children: ReactElement
	theme?: DefaultTheme
}

type AppThemeActionsTypes = AppThemeConstants.SHOW_LIGHT_MODE | AppThemeConstants.SHOW_DARK_MODE

type AppThemeActions = {
	type: AppThemeActionsTypes
}

type ReducerHandler = {
	[key in AppThemeActionsTypes]: (action: AppThemeActions) => AppThemeInitialState
}

export const AppThemeContext = createContext<AppThemeInitialState>({} as AppThemeInitialState)

const reducer = (state: AppThemeInitialState, action: AppThemeActions) => {
	const reducerHandler: ReducerHandler = {
		SHOW_LIGHT_MODE: () => ({ ...state, theme: lightTheme }),
		SHOW_DARK_MODE: () => ({ ...state, theme: darkTheme })
	}
	return reducerHandler[action.type](action)
}

export const AppThemeState = ({ children, theme }: AppThemeStateProps) => {
	const initialState: AppThemeInitialState = useMemo(
		() => ({
			theme: theme || darkTheme,
			toggleTheme: () => null
		}),
		[]
	)
	const [state, dispatch] = useReducer(reducer, initialState)

	const toggleTheme = useCallback(() => {
		const darkModeAction: AppThemeActions = { type: AppThemeConstants.SHOW_DARK_MODE }
		const lightModeAction: AppThemeActions = { type: AppThemeConstants.SHOW_LIGHT_MODE }
		const isDarkModeEnabled = state.theme.title === AppThemeConstants.DARK
		const actionToDispatch = isDarkModeEnabled ? lightModeAction : darkModeAction
		const themeToSwitch = isDarkModeEnabled ? AppThemeConstants.LIGHT : AppThemeConstants.DARK
		localStorage.setItem(AppThemeConstants.LOCALSTORAGE_NAME, JSON.stringify(themeToSwitch))
		dispatch(actionToDispatch)
	}, [state.theme.title])

	useEffect(() => {
		const storedTheme = localStorage.getItem(AppThemeConstants.LOCALSTORAGE_NAME)
		if (!storedTheme) return
		const parsedTheme = JSON.parse(storedTheme)
		state.theme.title !== parsedTheme && toggleTheme()
	}, [state.theme.title, toggleTheme])

	const contextValue: AppThemeInitialState = {
		...state,
		toggleTheme
	}

	return (
		<AppThemeContext.Provider value={contextValue}>
			<ThemeProvider theme={state.theme}>
				<GlobalStyles />
				{children}
			</ThemeProvider>
		</AppThemeContext.Provider>
	)
}
