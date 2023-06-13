module.exports = (connection, DataTypes) => {
  const Permissions = connection.define("permissions", {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allownull: false,
      autoIncrement: true,
    },
    p_name: {
      type: DataTypes.STRING,
      allownull: false
    },
  });
  return Permissions;
};
