const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');

const app = express();
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));

//hash password 
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


//compare the has password with the password during login phase
async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}


//generate token for a period of 2 hour
function generateToken(user) {
    return jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY), {
        expiresIn: '2h', //set token expiration time
    }
}


//login auhentication flow
async function loginUser(req, res) {
    const {username, password} = req.body;

    //get user from database TODO
    const user = {
        id: 1,
        firstname: 'Ansh',
        password: 'dfgbjdnfdkgbfkdjgn'
    };

    if(!user) {
        res.status(404).json({message: "User cannot be found"});
    }

    const checkIfPasswordValid = await comparePasswords(password, user.password);
    if(!checkIfPasswordValid) {
        res.status(401).json({ message: 'Access denied, the passwords do not match'});
    }

    const token = generateToken(user);

    res.status(200).json({ message: 'Login was successful', token});
}

//sign up authentication flow
async function signUpUser(req, res) {
    const {username, password} = req.body;

    //hash the password
    const hashedPassword  = await hashPassword(password);

    const newUser = {
        id: 1,
        firstname: 'Ansh',
        lastname: 'Baral',
        username,
        password: hashedPassword
    };
    //TODO SAVE INTO THE DATABASE
    res.status(201).json({ message: 'Registration was successful', user: newUser});
}


//middle for JWT authentication
function authenticateToken(req, res, next) { 
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'Access denied, no token given'});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    }
    catch(error) {
        res.status(400).json({message: 'Invalid token'})
    }
}


app.get('/authenticate', authenticateToken, (req, res) => {
    res.json({ message: 'You have been granted protected access', user: req.user});
})

app.post('/signup', signUpUser);

app.post('/login', loginUser);


app.get('/logout', (req, res) => {
    //clear the cookies i.e. the token
    res.clearCookie('token');
    res.json({message: 'Logout successfully'});
})

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Serer is running on ${PORT}`));
