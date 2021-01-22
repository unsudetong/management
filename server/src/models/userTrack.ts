const userTrack = (sequelize, DataTypes) => {
  const USER_TRACKS = sequelize.define(
    'USER_TRACKS',
    {},
    {
      freezeTableName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  );

  return USER_TRACKS;
};

export default userTrack;
