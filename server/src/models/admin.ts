const admin = (sequelize, DataTypes) => {
  const ADMINS = sequelize.define(
    'ADMINS',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  ADMINS.associate = models => {
    ADMINS.belongsTo(models.user, {
      foreignKey: 'USER_ID',
      targetKey: 'ID',
    });

    ADMINS.hasMany(models.article, {
      foreignKey: 'ADMIN_ID',
    });

    // ADMINS.belongsToMany(models.project, {
    // // through: models.projectArticle,
    // through: 'PROJECT_ARTICLES',
    //   foreignKey: 'ADMIN_ID',
    //   target: 'ID',
    //   primaryKey: true,
    // });
  };

  return ADMINS;
};

export default admin;
