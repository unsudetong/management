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

  return PROJECT_ARTICLES;
};

export default projectArticle;
