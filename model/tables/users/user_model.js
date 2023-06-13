module.exports = (connection, DataTypes) => {
  const User = connection.define("user", {
    u_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allownull: false,
      autoIncrement: true,
    },
    f_name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
    },
    password: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  return User;
};
