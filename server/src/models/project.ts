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
