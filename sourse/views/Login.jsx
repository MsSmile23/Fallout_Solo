const React = require('react');
const Layout = require('./Layout');

module.exports = function Login() {
  return (
    <Layout>
      <div className="registation-card">
        <div className="registation-form">
          <h2 className="headerTitle">Логин</h2>
          <div>
            <form action="/login" method="POST">
              <div className="register-data">
                <label>
                  Имя пользователя
                </label>
                <br />
                <input
                  name="name"
                  type="name"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="register-data">
                <label>
                  Пароль
                </label>
                <br />
                <input
                  name="password"
                  type="password"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="submit-register">
                <button type="submit" className="login-btn">
                  Авторизоваться
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
