import type { AppProps } from "next/app";
import "../../styles/globals.css";

export default function MicroFrontend({
  Component,
  pageProps
}: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
