const bcrypt = require('bcrypt');
const User = require('../models/user.js');


const registerUser = async (req, res) => {
    try {
        const { name, email, phone_number, password } = req.body;

        // check if user already exisits
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'user already exists' })
        }

        // encrypt password AND Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // store user in database 

        const newUser = await User.create({
                name,
                email,
                phone_number,
                password: hashedPassword,
            });

        return res.status(201).json({ message: 'user created successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user', error: error.message })
    }
}

module.exports = registerUser;