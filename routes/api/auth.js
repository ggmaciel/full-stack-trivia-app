const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User Model
const User = require("../../models/User");

//Login User
//@route /api/auth
router.post("/", (req, res) => {
    const { email, password } = req.body;

    //Validatation
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    User.findOne({ email }).then((user) => {
        if (!user)
            return res.status(400).json({ message: "User does not exists" });

        //Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).json({ message: "Invalid credentials" });

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

//Get user
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => {
            res.json(user);
        });
});

//Edit points
router.put("/update", auth, (req, res) => {
    const { updatePoints } = req.body;
    User.findById(req.user.id)
        .then((user) => {
            user.points = user.points + updatePoints;
            user.save();
            res.json({
                message: `You scored ${updatePoints} points! and you have ${user.points}  points`,
            });
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Update Matches

router.put("/matches", auth, (req, res) => {
    const { category, points, difficulty, questionQuantity } = req.body;
    User.findById(req.user.id)
        .then((user) => {
            const matches = {
                Category: category,
                Points: points,
                Difficulty: difficulty,
                Questions: questionQuantity,
                Date: Date.now(),
            };
            user.matches.push(matches);
            user.save();
            res.json(user.matches);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

router.get("/rank", auth, (req, res) => {
    User.find({}, { points: 1, handle: 1, matches: 1, _id: 0 })
        .sort({ points: -1 })
        .then((user) => {
            return res.json(user);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;
