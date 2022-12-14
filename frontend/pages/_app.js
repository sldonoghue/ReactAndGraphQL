// To control anything higher the page level, like the header or footer, you can use the _app.js file. This is a special file that Next.js will look for and load automatically. It is a component that will be common across all pages. You can use this to keep state when navigating pages, for example.
import Page from "../components/Page";

import NProgress  from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}