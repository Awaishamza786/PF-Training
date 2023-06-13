module.exports = (connection, DataTypes) => {
  const UserRoles = connection.define("user_roles", {
    u_id: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    r_id: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  });
  return UserRoles;
};
module.exports = (connection, DataTypes) => {
  const UserRoles = connection.define("user_roles", {
    u_id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true
    },
    r_id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true
    },
  });
  return UserRoles;
};
