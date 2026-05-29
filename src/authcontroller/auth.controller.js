const usermodel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { email, name, password } = req.body;
    const isExists = await usermodel.findOne({ where: { email } });

    if (isExists) {
        return res.status(409).json({ message: "user already existed" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await usermodel.create({ email, name, password: hash });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token);
    res.status(201).json({ message: "user created successfully", user: { name: user.name, email: user.email }, token });
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);

    if (!isPasswordvalid) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token);
    res.status(200).json({ message: "user logged in successfully", user: { name: user.name, email: user.email}, token });
}

// NAYA FUNCTION: Discord bot ke /ppgetuser ke liye
async function getUserByEmail(req, res) {
    const { email } = req.params;
    const user = await usermodel.findOne({ where: { email } });
    
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    
    res.status(200).json({ user: { name: user.name, email: user.email } });
}

module.exports = { registerUser, loginUser, getUserByEmail };