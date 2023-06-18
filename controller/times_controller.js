const session_model = require("./../model/session");
const user_model = require("./../model/user_model");

const show = async (req, res) => {
  try {
    
    const session_db_data = await session_model.find({});
    if (session_db_data!=null) res.status(200).send(session_db_data);
    else
      res.status(200).send({ "session Data": "No user session record found" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Invalid to show session Record", Error: err });
  }
};

async function getUserId(email) {
  console.log(email);
  return await user_model.findOne({ email: email }, { _id: 0, password: 0 });
}
const show_specific = async (req, res) => {
  try {
    const email = await req.params.email;
    const userId = await user_model.findOne({email:email});
    // console.log(userId)
    if (userId != null) {
      const today = await new Date().toDateString();
      const session_db_data = await session_model.findOne({
        email: email,
        date: today,
        end: "null",
      });
      if (session_db_data != null)
        res.status(200).send(`Login at : ${session_db_data.start}`);
      else
        res
          .status(200)
          .send({ "session Data": "No user session record found" });
    } else res.status(200).send({ "Session Data": "No user found" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Invalid to show session Record", Error: err });
  }
};

const show_specific_user_session = async (req, res) => {
  try {
    const email = await req.params.email;
    const today = await new Date().toDateString();
    const userId = await session_model.findOne({email:email,date:today});
    // console.log(userId)
    if (userId != null) {
      
      const session_db_data = await session_model.find(
        { email: email, date: today },
        { email: 1, start: 1, end: 1, location: 1, _id: 0 }
      );
      if (session_db_data != null)
        res.status(200).send(`Login at : ${session_db_data}`);
      else
        res
          .status(200)
          .send({ "session Data": "No user session record found" });
    } else res.status(200).send({ "Session Data": "No user found" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Invalid to show session Record", Error: err });
  }
};

module.exports = { show, show_specific, show_specific_user_session };
