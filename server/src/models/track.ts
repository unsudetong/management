const track = (sequelize, DataTypes) => {
  const TRACKS = sequelize.define(
    'TRACKS',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      DEPARTMENT: {
        type: DataTypes.STRING(18),
      },
    },
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  return TRACKS;
};

export default track;
