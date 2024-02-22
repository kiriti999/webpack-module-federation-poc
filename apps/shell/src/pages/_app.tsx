import type { AppProps } from "next/app";

function ShellApp({ Component, pageProps }: AppProps): JSX.Element {
  const AnyComponent = Component as any;
  return <AnyComponent {...pageProps} />;
}

export default ShellApp;
