const React = require('react');
const Layout = require('./Layout');

module.exports = function NewPost(user) {
  return (
    <Layout user={user}>
      <div className="registation-card">
        <div className="post-creation-form">
          <h2 className="headerTitle">Создать новый пост</h2>
          <div>
            <form action="/newpost" method="POST">
              <div className="post-creation-data">
                <label>
                  Заголовок вашего поста
                </label>
                <br />
                <input
                  name="title"
                  type="title-post"
                />
              </div>
              <div className="post-creation-data">
                <label>
                  Сам текст
                </label>
                <br />
                <textarea rows='2' cols='25'
                  name="body"
                  type="title-body"
                />
              </div>
              <div className="submit-post">
                <button type="submit" className="registation-post">
                  Создать пост
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
