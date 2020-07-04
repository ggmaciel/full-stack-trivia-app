const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const path = require("path");

//Body-Parser
app.use(express.json());

//Database
const db = config.get("mongoURI");

//Mongo Connection
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

//Routes
app.use("/api/users", require("./routes/api/register")); //Register User and Get all users
app.use("/api/auth", require("./routes/api/auth")); //Login, Get User

//Server static assets if in production

if (process.env.NODE_ENV === "production") {
    //Set Static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Started on port ${port}`));
