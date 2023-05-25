import '@/styles/globals.css'
import * as React from 'react';
import store from '@/store/store';
import { Provider } from 'react-redux';
// import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
