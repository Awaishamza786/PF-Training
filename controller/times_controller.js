const session_model = require("./../model/session");
const user_model = require("./../model/user_model");

const show = async (req, res) => {
  try {
    const session_db_data = await session_model.find({});
    if (session_db_data != null) res.status(200).send(session_db_data);
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
    const userId = await user_model.findOne({ email: email });
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
    const userId = await session_model.findOne({ email: email, date: today });
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
async function checkSessionAndUpdate(session) {
  if (session.end == "null") {
    session.end = await new Date().toTimeString().split(" ").at(0);
    console.log("end--->" + session.end);
    await session_model.updateOne(
      { email: session.email, date: session.date, end: "null" },
      { $set: { end: session.end } }
    );
    return session.end;
  } else return session.end;
}
const save_all_user_working_time = async (req, res) => {
  const today = await new Date().toDateString();
  console.log(`today ${today}`);
  const unique_emails = await session_model
    .find({ date: today })
    .distinct("email");
  console.log(`unique email ${unique_emails}`);
  if (unique_emails == "") {
    res.status(200).send("No session start today");
  } else {
    unique_emails.map(async (user_email) => {
      const user_sessions = await session_model.find({
        email: user_email,
        date: new Date().toDateString(),
      });
      var total_time = 0;
      await user_sessions.map((session) => {
        session.end = checkSessionAndUpdate(session);
        const endTime = new Date(
          `1970-01-01T${
            session.end == "null"
              ? new Date().toTimeString().split(" ").at(0)
              : session.end
          }`
        );
        const startTime = new Date(`1970-01-01T${session.start}`);
        console.log(session.start+"  start time--->" + startTime+"  end time  "+endTime);
        const timeDiff = endTime - startTime;
        console.log("diff time--->" + timeDiff);
        total_time += timeDiff / 3600000;
        console.log("total time--->" + total_time);
      });
      console.log({ user_email, total_time });
    });
    res.status(200).send(`${unique_emails}`);
  }
};

module.exports = {
  show,
  show_specific,
  show_specific_user_session,
  save_all_user_working_time,
};
