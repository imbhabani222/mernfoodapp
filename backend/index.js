const express = require("express");
const app = express();
const PORT = 5000;
const mongoDB = require("./db");

mongoDB();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type , Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));

// console.log(global.myName)

app.listen(PORT, () => {
  console.log(`server is started ${PORT}`);
});
