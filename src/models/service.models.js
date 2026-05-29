const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); 

const Service = sequelize.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Service.sync()
    .then(() => console.log("Service table created"))
    .catch((err) => console.log("Error creating service table:", err));

module.exports = Service;