const Sequelize = require('sequelize');
const sequelize = require('../config/databse');
const jwt = require('jsonwebtoken');

const User = sequelize.define(
    'user',
     {
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone_number:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },

     },
    {
        tableName: "users",
        timestamps: true, // This is enabled by default
    }
);


User.prototype.generateAuthToken = function (){
    const token = jwt.sign({id: this.id, email:this.email}, process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
};

module.exports = User;