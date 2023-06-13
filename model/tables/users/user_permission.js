module.exports = (connection, DataTypes) => {
    const UserPermissions = connection.define("user_permissions", {
      u_id: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true
      },
      p_id: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true
      },
    });
    return UserPermissions;
  };
  