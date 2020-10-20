const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = 3000;

const homeRouter = require("./routes/homeRoutes");
const contactsRouter = require("./routes/contactsRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.use("/whos-there", homeRouter);
app.use("/contacts", contactsRouter);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}...`));

module.exports = app;
