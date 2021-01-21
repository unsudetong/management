const projectArticle = (sequelize, DataTypes) => {
  const PROJECT_ARTICLES = sequelize.define(
    'PROJECT_ARTICLES',
    {},
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  return PROJECT_ARTICLES;
};

export default projectArticle;
