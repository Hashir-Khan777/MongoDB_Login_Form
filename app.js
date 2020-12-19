const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const app = express();

app.set("port", process.env.PORT || 3000);

app.use("/", express.static(__dirname));

app.use(bodyParser());

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.ulzxi.mongodb.net/formdb?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection
  .once("open", () => {
    console.log("Yahoo....");
  })
  .on("error", (err) => {
    console.log("error");
  });

const UserShema = new Schema({
  name: String,
  password: String,
});

const User = mongoose.model("user", UserShema);

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/submitted.html");
  const DB_user = new User({
    user: JSON.stringify(req.body),
  });
  DB_user.save()
    .then(() => console.log("User saved"))
    .catch((err) => console.log("Error ==>", err));
});

app.listen(app.get("port"), () => {
  console.log(`Express Started on: http://localhost:${app.get("port")}`);
});
