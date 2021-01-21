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

  return ARTICLES;
};

export default article;
