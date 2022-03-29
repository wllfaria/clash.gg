import { AppThemeState } from '../presentation/states/AppThemeState'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppThemeState>
			<Component {...pageProps} />
		</AppThemeState>
	)
}
