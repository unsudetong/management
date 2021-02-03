const article = (sequelize, DataTypes) => {
  const ARTICLES = sequelize.define(
    'ARTICLES',
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
        allowNull: false,
      },
      CONTENTS: {
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

  ARTICLES.associate = models => {
    ARTICLES.belongsTo(models.project, {
      foreignKey: 'PROJECT_ID',
    });
  };
  return ARTICLES;
};

export default article;
