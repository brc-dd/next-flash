import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import './styles.css'

const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session} refetchInterval={0}>
    <Component {...pageProps} />
  </SessionProvider>
)

export default App
