const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); 

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// this line check  in database table exist or not
User.sync()
    .then(() => console.log("User table created or already exists"))
    .catch((err) => console.log("Error creating table:", err));

module.exports = User;