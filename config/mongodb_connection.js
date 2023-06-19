// const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");


try {
  mongoose.connect(process.env.URI, {
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
