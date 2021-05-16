require("dotenv").config() 
const express = require("express");
const articlesRouter = require("./Routes/articles");
const registerRouter = require("./Routes/register");
const loginRouter = require("./Routes/login");
const logoutRouter = require("./Routes/logout");
const userRouter = require("./Routes/user");
const refreshRouter = require("./Routes/refresh");
const app = express();
const PORT = process.env.PORT || 15000;
const mongoose = require("mongoose");

//database connection
const url =
  "mongodb+srv://admin:iamdon123@cluster0.f7cl5.mongodb.net/node-api?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;

connection
  .once("open", () => console.log("database connected"))
  .catch((err) => console.log(err));

//routes
app.use(express.json());
app.use("/api/articles", articlesRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/logout", logoutRouter);

//

app.listen(PORT, () => console.log(`server is running on PORT : ${PORT}`));
