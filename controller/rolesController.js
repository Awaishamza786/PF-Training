const db = require("./../model/connection/connection_model");

const table_role = db.role;

class Role_Data {
  constructor(r_name) {
    this.r_name = r_name;
  }
}

const getRoles = async (req, res) => {
  try {
    let role = await table_role.findAll({});
    res.status(200).send(role);
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController getUser => " + err);
  }
};

const addRole = async (req, res) => {
  try {
    const value = req.body;

    const role = new Role_Data(
      value.r_name,
    );
    await table_role.create(role);
    res.status(200).send({ role });
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController addUser => " + err);
  }
};

module.exports = {
  getRoles,
  addRole,
};
