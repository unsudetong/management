const project = (sequelize, DataTypes) => {
  const PROJECTS = sequelize.define(
    'PROJECTS',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      TITLE: {
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  PROJECTS.associate = models => {
    PROJECTS.belongsToMany(models.article, {
      through: models.projectArticle,
      // through: 'PROJECT_ARTICLES',
      foreignKey: 'PROJECT_ID',
      targetKey: 'ID',
      // primaryKey: true,
    });

    PROJECTS.belongsTo(models.admin, {
      foreignKey: 'WRITER',
      targetKey: 'ID',
    });

    PROJECTS.belongsTo(models.track, {
      foreignKey: 'TRACK_ID',
      targetKey: 'ID',
    });
  };

  return PROJECTS;
};

export default project;
