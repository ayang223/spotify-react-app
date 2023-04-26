import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import React from "react";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";

function App({ Component, pageProps: { session, ...rest } }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...props} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default App;
