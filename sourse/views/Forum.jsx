const React = require('react');
const Layout = require('./Layout');
const PostCard = require('./PostCard');

module.exports = function Forum({ user, posts }) {
  return (
    <Layout user={user}>
      <div className="forum-card">
        <div className="body-forum">
          <h1 className="headerTitle">Форум</h1>
          {user?.name && <h1 className="welcome">{`С возвращением на форум ${user.name}!`}</h1>}
          <h2 className="welcomeforum">Пожалуйста, соблюдайте правила приличия и не оскорбляйте друг друга</h2>
          <div className="hiddenCreate">
            {user?.name
          && (
            <a href="/newpost" className="btn btn-xs post-link">Начать новую тему</a>
          )}
          </div>
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
