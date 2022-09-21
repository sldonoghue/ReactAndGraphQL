// To control anything higher the page level, like the header or footer, you can use the _app.js file. This is a special file that Next.js will look for and load automatically. It is a component that will be common across all pages. You can use this to keep state when navigating pages, for example.
import Page from "../components/Page";

import { ApolloProvider } from "@apollo/client";
import NProgress  from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}> 
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

//Tell Next JS to fetch all queries in the child components
// ctx = context
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  //Allows us to get any query variables at the page level
  pageProps.query = ctx.query;
  return { pageProps };
};

// withData function is a higher order component that will wrap our _app.js component. It will provide the apollo client to our app.
export default withData(MyApp);