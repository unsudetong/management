const projectArticle = (sequelize, DataTypes) => {
  const PROJECT_ARTICLES = sequelize.define(
    'PROJECT_ARTICLES',
    {
      ARTICLE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ARTICLES',
          key: 'ID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },

      PROJECT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'PROJECTS',
          key: 'ID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
    },
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  // PROJECT_ARTICLES.associate = models => {
  //   PROJECT_ARTICLES.hasMany(models.project, {
  //     through: models.projectArticle,
  //     foreignKey: 'ARTICLE_ID',
  //     target: 'ID',
  //     name: 'ARTICLE_ID',
  //     fieldName: 'ARTICLE_ID',
  //     // primaryKey: true,
  //     targetKey: 'ID',
  //   });
  return PROJECT_ARTICLES;
};

export default projectArticle;
