const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Comment }) {
      this.hasMany(Post, { foreignKey: 'user_id' });
      this.hasMany(Comment, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    faction: DataTypes.STRING,
    reputation: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

