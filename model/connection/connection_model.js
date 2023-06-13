const { Sequelize, DataTypes } = require("sequelize");
const asyncHandler = require("express-async-handler");
const config = require("./../../config/sequilize_config");

const connection = new Sequelize(
  config.DBNAME,
  config.USERNAME,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
    operatorAliases: false,

    pool: {
      // max: config.pool.max,
      // min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);
connection
  .query(`CREATE DATABASE IF NOT EXISTS ${config.DBNAME}`)
  .then(() => {
    console.log("Database created if it did not exist.");
    connection.authenticate();
  })
  .then(() => {
    console.log("Connected to the database successfully.");
    // Rest of your code
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

// config.products = require("./product_model")(connection, DataTypes);
db.user = require("./../tables/users/user_model")(connection, DataTypes);
db.permissions = require("./../tables/permissions/permission_model")(
  connection,
  DataTypes
);
db.role = require("./../tables/roles/role_model")(connection, DataTypes);

db.users_permission = require("./../tables/users/user_permission")(
  connection,
  DataTypes
);
db.users_role = require("./../tables/users/user_roles")(connection, DataTypes);

db.users_permission.hasMany(db.user, { foreignKey: "u_id" });
db.users_permission.hasMany(db.permissions, { foreignKey: "p_id" });

db.users_role.hasMany(db.user, { foreignKey: "u_id" });
db.users_role.hasMany(db.role, { foreignKey: "r_id" });

db.connection
  .sync({ alter: true })
  .then(() => {
    console.log(`models/user_models yes resync done => `);
  })
  .catch((err) => {
    console.log(`models/user_models catch resync not done => ${err}`);
  });

module.exports = db;
