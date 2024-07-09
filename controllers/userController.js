const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
    });

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jsonwebtoken.sign({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' });

        res.status(200).json({ token });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };