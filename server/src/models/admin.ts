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

  return ADMINS;
};

export default admin;
