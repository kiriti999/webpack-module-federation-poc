import type { AppProps } from "next/app";

function ShellApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default ShellApp;
