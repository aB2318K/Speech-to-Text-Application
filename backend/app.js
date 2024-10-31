const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const CORS = require('cors');
const User = require('./models/user');

const app = express();
app.use(CORS());
app.use(express.json());
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
    return jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '2h', //set token expiration time
    });
}


//login auhentication flow
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            return res.status(404).json({ message: 'User cannot be not found' });
        }

        const checkIfPasswordValid = await comparePasswords(password, currentUser.password);
        if (!checkIfPasswordValid) {
            return res.status(401).json({ message: 'Access denied, passwords do not match' });
        }

        const token = generateToken(currentUser);
        res.status(200).json({ message: 'Login was successful', token });
    } catch (error) {
        res.status(400).json({ message: 'Error during login', error: error.message });
    }

}

//sign up authentication flow
async function signUpUser(req, res) {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Check if the user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: '*This email is already registered. Try logging in instead.' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user instance
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // Save new user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Registration was successful', user: savedUser });
    } catch (error) {
        console.error('Error during sign up:', error.message);
        res.status(500).json({ message: 'An error occurred during sign up.', error: error.message });
    }
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
