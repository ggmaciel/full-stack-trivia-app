const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../../models/User");

//Register User
//@route /api/users
router.post("/", (req, res) => {
    const { handle, email, password } = req.body;

    //Validtation
    if (!handle || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    User.findOne({ email }).then((user) => {
        if (user)
            return res.status(400).json({ message: "User already exists" });

        const newUser = new User({
            handle,
            email,
            password,
        });

        //Password hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                //With the hash, save user on database
                newUser.save().then((user) => {
                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    handle: user.handle,
                                    email: user.email,
                                    points: user.points,
                                    register_date: user.register_date,
                                },
                            });
                        }
                    );
                });
            });
        });
    });
});

module.exports = router;
