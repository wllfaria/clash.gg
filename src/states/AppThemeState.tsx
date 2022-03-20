import { AppThemeConstants } from '../utils/constants'
import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { globalStyles as GlobalStyles, darkTheme, lightTheme } from '../styles'

export type AppThemeInitialState = {
	theme: DefaultTheme
	toggleTheme: () => void
}

type AppThemeStateProps = {
	children: React.ReactElement
	theme: DefaultTheme
}

type AppThemeActionsTypes =  AppThemeConstants.SHOW_LIGHT_MODE | AppThemeConstants.SHOW_DARK_MODE

type AppThemeActions = {
	type: AppThemeActionsTypes
}

type ReducerHandler = {
	[key in AppThemeActionsTypes]: (action: AppThemeActions) => AppThemeInitialState
}

export const AppThemeContext = createContext<AppThemeInitialState>({} as AppThemeInitialState)

const reducer = (state: AppThemeInitialState, action: AppThemeActions) => {
	const reducerHandler: ReducerHandler = {
		SHOW_LIGHT_MODE: () => {
			return { ...state, theme: lightTheme }
		},
		SHOW_DARK_MODE: () => {
			return { ...state, theme: darkTheme }
		}
	}

	return reducerHandler[action.type](action)
}

export const AppThemeState = ({ children, theme }: AppThemeStateProps ) => {
	const initialState: AppThemeInitialState = useMemo(() => ({
		theme: theme || darkTheme,
		toggleTheme: () => null
	}), [])

	const [state, dispatch] = useReducer(reducer, initialState)


	const makeSwitchModeAction = (actionType: AppThemeConstants.SHOW_DARK_MODE | AppThemeConstants.SHOW_LIGHT_MODE): AppThemeActions => {
		return {
			type: actionType,
		}
	}

	const toggleTheme = useCallback(() => {
		const darkModeAction = makeSwitchModeAction(AppThemeConstants.SHOW_DARK_MODE)
		const lightModeAction = makeSwitchModeAction(AppThemeConstants.SHOW_LIGHT_MODE)
		const isCurrentThemeDark = state.theme.title === AppThemeConstants.DARK
		const actionToDispatch = isCurrentThemeDark ? lightModeAction : darkModeAction
		const themeToSwitch = isCurrentThemeDark ? AppThemeConstants.LIGHT : AppThemeConstants.DARK
		window.localStorage.setItem(AppThemeConstants.LOCALSTORAGE_NAME, JSON.stringify(themeToSwitch))
		dispatch(actionToDispatch)
	}, [state.theme.title])

	useEffect(() => {
		const savedTheme = window.localStorage.getItem(AppThemeConstants.LOCALSTORAGE_NAME)
		if (!savedTheme) return
		const themeParsed = JSON.parse(savedTheme)
		state.theme.title !== themeParsed && toggleTheme()
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
