const User = requre('../models/userModel');

const getAllUsers = async (req, res) => {
    try{
    const users = await User.findAll({attributes:['id', 'name', 'email']});// Fetch all users except passwords

    res.status(200).json(users);
}catch(err){    
    res.status(500).json({message: "Server Error userController"});
}
};

module.exports = getAllUsers;