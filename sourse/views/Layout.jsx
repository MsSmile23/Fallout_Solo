const React = require('react');

module.exports = function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
        <script defer src="/js/index.js" />
        <title>Fallout Forum</title>
      </head>
      <body>
        <div className='body'>
          {children}
        </div>
      </body>
    </html>
  );
};
