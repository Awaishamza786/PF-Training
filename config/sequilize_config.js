module.exports = {
  HOST: "localhost",
  USERNAME: "root",
  PASSWORD: "",
  DBNAME: "PERMISSIONHANDLER",
  DIALECT: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000, //require time
    idle: 10000, // idle time
  },
};
