const React = require('react');
const Layout = require('./Layout');

module.exports = function Profile({ user, person, forum, comment }) {
  return (
    <Layout user={user}>
      <div className="profile-box">
        <div className="body-profile">
          {user?.name && <h1 className="headerTitle">{`Ваша страница ${user.name}!`}</h1>}
          <p>{`Имя пользвателя: ${person.name}`}</p>
          <p>{`Электронная почта: ${person.email}`}</p>
          <p>{`Принадлежность фракции: ${person.faction}`}</p>
          <p>{`Звание: ${person.reputation}`}</p>
          <p>{`Активность на форуме: ${forum.length + comment.length} сообщений`}</p>
          <p>{`Профиль создан: ${person.createdAt}`}</p>
        </div>
      </div>
    </Layout>
  );
};
