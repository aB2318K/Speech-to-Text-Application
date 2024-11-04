const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const CORS = require('cors');
const User = require('./models/user');
const Speech = require('./models/Speech');

const app = express();
app.use(CORS({ origin: 'http://localhost:3000' }));
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
        res.status(200).json({ message: 'Login was successful', token, userID: currentUser._id });
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
    console.log(token);

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


/*
app.get('/logout', (req, res) => {
    //clear the cookies i.e. the token
    res.clearCookie('token');
    res.json({message: 'Logout successfully'});
})
*/

app.post('/speeches', authenticateToken, async (req, res) => {
    try {
        const { title, speechData, userId } = req.body;

        // Validate that userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        const user = new mongoose.Types.ObjectId(userId); // Convert to ObjectId

        const newSpeech = new Speech({
            title,
            data: speechData,
            user 
        });

        const savedSpeech = await newSpeech.save();
        res.status(201).json(savedSpeech);
    } catch (error) {
        console.error('Error creating speech:', error); 
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.get('/speeches', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.query; 
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const speeches = await Speech.find({ user: userObjectId });
        if (speeches.length === 0) {
            return res.status(404).json({ message: 'No speeches found for this user.' });
        }

        return res.status(200).json(speeches);
    } catch (error) {
        console.error('Error fetching speeches:', error);
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

app.get('/speeches/:speechId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.query; 
        const { speechId } = req.params;

        // Check if both userId and speechId are valid MongoDB Object IDs
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(speechId)) {
            return res.status(400).json({ message: 'Invalid user ID or speech ID.' });
        }

        // Convert userId and speechId to MongoDB ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const speechObjectId = new mongoose.Types.ObjectId(speechId);

        // Find the speech by speechId
        const speech = await Speech.findOne({ _id: speechObjectId });

        if (!speech) {
            return res.status(404).json({ message: 'Speech not found.' });
        }

        // Check if the speech's user matches the provided userId
        if (!speech.user.equals(userObjectId)) {
            return res.status(403).json({ message: 'Access denied. Unauthorized user.' });
        }

        // Return the speech if userId matches
        return res.status(200).json(speech);
    } catch (error) {
        console.error('Error fetching speech:', error);
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

app.put('/speeches/:speechId', authenticateToken, async(req, res) => {
    try {
        const { speechId  } = req.params;
        const { title, data, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(speechId)) {
            return res.status(400).json({ message: 'Invalid user ID or speech ID.' });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const speechObjectId = new mongoose.Types.ObjectId(speechId);

        const speech = await Speech.findOne({ _id: speechObjectId });

        if (!speech) {
            return res.status(404).json({ message: 'Speech not found.' });
        }

        if (!speech.user.equals(userObjectId)) {
            return res.status(403).json({ message: 'Access denied. Unauthorized user.' });
        }

        speech.title = title;
        speech.data = data;

        const updatedSpeech = speech.save();
        res.status(200).json(updatedSpeech)
    } catch {
        console.error('Error updating speech:', error);
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
})

app.delete('/speeches/:speechId', authenticateToken, async (req, res) => {
    try {
        const { speechId } = req.params;
        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(speechId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID or speech ID.' });
        }
        const speech = await Speech.findById(speechId);

        if (!speech) {
            return res.status(404).json({ message: 'Speech not found.' });
        }

        // Check if the user owns the speech
        if (!speech.user.equals(userId)) {
            return res.status(403).json({ message: 'Access denied. Unauthorized user.' });
        }

        // Delete the speech
        await Speech.deleteOne({ _id: speechId });

        res.status(200).json({ message: 'Speech deleted successfully.' });

    } catch {
        console.error('Error deleting speech:', error);
        return res.status(500).json({ message: 'Server error.', error: error.message });
    }
})



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
