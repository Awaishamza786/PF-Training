// const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://awaishamza579:Qwerty1234@demo.1q6sxjc.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    })
    .catch(() => {
      console.log("Pinged your deployment. not connected to MongoDB!");
    });
} catch (err) {
  // Ensures that the client will close when you finish/error
  console.log("catch / mongodb.js => " + err);
  client.close();
}
//run().catch(console.dir);
