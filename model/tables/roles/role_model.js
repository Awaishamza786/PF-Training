module.exports = (connection, DataTypes) => {
  const Roles = connection.define("roles", {
    r_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allownull: false,
      autoIncrement: true,
    },
    r_name: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  return Roles;
};
