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
      foreignKey: 'PROJECT_ID',
      primaryKey: true,
    });

    PROJECTS.belongsTo(models.admin, {
      foreignKey: 'WRITER',
      target: 'ID',
    });

    PROJECTS.belongsTo(models.track, {
      foreignKey: 'TRACK_ID',
      target: 'ID',
    });
  };

  return PROJECTS;
};

export default project;
