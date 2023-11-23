/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import "../styles/global.scss";

interface Props {
  Component: React.FC;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}
function App({ Component, pageProps }: Props) {
  return <Component {...pageProps} />;
}

export default App;
