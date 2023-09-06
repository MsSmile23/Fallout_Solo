const React = require('react');

module.exports = function Layout({ children, user }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="css/cardinal.css" />
        <script defer src="/js/index.js" />
        <title>Fallout Forum</title>
      </head>
      <body>
        <div className="headers">
          <p className="btn-group">
            <a href="/" className="btn btn-xs" id="link1">На главную страницу</a>
            <a href="/forum" className="btn btn-xs" id="link2">Форум и обсуждения</a>
            {user ? (
              <>
                <a href="/profile" className="btn btn-xs" id="link5">Профиль</a>
                <a href="/logout" className="btn btn-xs" id="link6">Выйти из профиля</a>
              </>
            ) : (
              <>
                <a href="/registration" className="btn btn-xs" id="link3">Регистрация</a>
                <a href="/login" className="btn btn-xs" id="link4">Авторизация</a>
              </>
            )}
          </p>
        </div>
        {children}
      </body>
    </html>
  );
};
