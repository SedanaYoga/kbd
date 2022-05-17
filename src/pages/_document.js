import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='/images/logo.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='modal-root'></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
