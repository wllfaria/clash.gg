import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyles, DarkTheme, LightTheme } from '../styles'
import { AppThemeConstants } from '../utils/constants'

export type AppThemeState = {
	theme: DefaultTheme
	toggleTheme: () => void
}

type AppThemeActionsTypes =  AppThemeConstants.SHOW_LIGHT_MODE | AppThemeConstants.SHOW_DARK_MODE

type AppThemeActions = {
	type: AppThemeActionsTypes
	payload: DefaultTheme
}

type ReducerHandler = {
	[key in AppThemeActionsTypes]: (action: AppThemeActions) => AppThemeState
}

const initialState: AppThemeState = {
	theme: DarkTheme,
	toggleTheme: () => null
}

export const AppThemeContext = createContext<AppThemeState>(initialState)

const reducer = (state: AppThemeState, action: AppThemeActions) => {
	const reducerHandler: ReducerHandler = {
		SHOW_LIGHT_MODE: action => {
			return { ...state, theme: action.payload }
		},
		SHOW_DARK_MODE: action => {
			return { ...state, theme: action.payload }
		}
	}

	return reducerHandler[action.type](action)
}

const AppThemeState: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const makeSwitchModeAction = (actionType: AppThemeConstants.SHOW_DARK_MODE | AppThemeConstants.SHOW_LIGHT_MODE, theme: DefaultTheme): AppThemeActions => {
		return {
			type: actionType,
			payload: theme
		}

	}

	const toggleTheme = useCallback(() => {
		const darkModeAction = makeSwitchModeAction(AppThemeConstants.SHOW_DARK_MODE, DarkTheme)
		const lightModeAction = makeSwitchModeAction(AppThemeConstants.SHOW_LIGHT_MODE, LightTheme)
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

	const contextValue: AppThemeState = {
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

export default AppThemeState
