const user = (sequelize, DataTypes) => {
  const USERS = sequelize.define(
    'USERS',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      STUDENT_ID: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      PASSWORD: {
        type: DataTypes.STRING(18),
        allowNull: false,
      },
      NAME: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      MAJOR: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      GITHUB_ID: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      GOOGLE_ID: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DOUBLE_MAJOR: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  USERS.associate = models => {
    USERS.belongsToMany(models.track, {
      through: 'USER_TRACKS',
      foreignKey: 'USER_ID',
      // target: 'ID',
    });
  };

  return USERS;
};

export default user;
