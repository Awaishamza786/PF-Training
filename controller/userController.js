const db = require("./../model/connection/connection_model");

const tableUser = db.user;

class User_Data {
  constructor(fname, lname, email, password) {
    this.f_name = fname;
    this.l_name = lname;
    this.email = email;
    this.password = password;
  }
}

const getUser = async (req, res) => {
  try {
    let users = await tableUser.findAll({});
    res.status(200).send(users);
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController getUser => " + err);
  }
};

const addUser = async (req, res) => {
  try {
    const value = req.body;

    const user = new User_Data(
      value.fname,
      value.lname,
      value.email,
      value.password
    );
    await tableUser.create(user);
    res.status(200).send({ user });
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController addUser => " + err);
  }
};

module.exports = {
  getUser,
  addUser,
};
