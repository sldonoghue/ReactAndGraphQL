// Allows for custom document markup

import Document, { Html } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" href="/static/favicon.png" />
                <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
                <link rel="stylesheet" type="text/css" href="/static/styles.css" />
                <title>Test Store App</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
        )
    }
}