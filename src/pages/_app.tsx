import type { AppProps } from 'next/app'
import AppThemeState from '../states/AppThemeState'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppThemeState>
			<Component {...pageProps} />
		</AppThemeState>
	)
}
