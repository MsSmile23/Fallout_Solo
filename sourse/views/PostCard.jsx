const React = require('react');

function PostCard({ post }) {
  return (
    <div className="outer-card">
      <div className="inner-card">
        <h5>{post.title}</h5>
        <p>
          Сообщение:
          {' '}
          {post.body}
        </p>
        <div className="authorinfo">
          <p>
            Автор:
            {' '}
            {post.User.name}
          </p>
          <p>
            Фракция:
            {' '}
            {post.User.faction}
          </p>
          <p>
            Репутация:
            {' '}
            {post.User.reputation}
          </p>
        </div>
        <p>
          Количество комментариев:
          {' '}
          {post.comments.length}
        </p>
        <div className="comment-link-box">
            <a href="/forum" className="btn btn-xs comment-link">Перейти в обсуждения</a>
        </div>
      </div>
    </div>
  );
}

module.exports = PostCard;
