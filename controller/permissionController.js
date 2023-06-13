const db = require("./../model/connection/connection_model");

const tablePermission = db.permissions;

class Permission_Class {
  constructor(name) {
    this.p_name = name;
  }
}

const getPermission = async (req, res) => {
  try {
    let permissions = await tablePermission.findAll({});
    res.status(200).send(permissions);
  } catch (err) {
    res.status(200).send({ message: "No Record Found of Permission" });
    console.log("controller/permissionController getPermission => " + err);
  }
};

const addPermission = async (req, res) => {
  try {
    const {p_name} = req.body;
    // const permission_data = new Permission_Class(p_name);
    const data  = await tablePermission.create({
        
        p_id:0,
        p_name,
    }
         , {new:true});
    console.log(data , '<====')
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ message: "Internal serever error" });
    console.log("controller => " + err);
  }
};

module.exports = {
  getPermission,
  addPermission,
};
