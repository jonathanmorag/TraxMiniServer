const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = 3000;

const homeRouter = require("./routes/home");
const contactsRouter = require("./routes/contacts");

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.use("/whos-there", homeRouter);
app.use("/contacts", contactsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server is listeting at port ${PORT}...`));

module.exports = app;
