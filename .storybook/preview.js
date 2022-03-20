import { AppThemeState } from '../src/states/AppThemeState'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
	(Story) => (
		<AppThemeState>
			<Story />
		</AppThemeState>
	)
]
