const { Sequelize } = require('sequelize');

// MySQL se connect karne ke liye Sequelize ka instance bana rahe hain
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Terminal  avoid   SQL queries  log close
    }
);

// Connection test 
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Database Connected Successfully via Sequelize! 🎉');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

module.exports = { sequelize, connectDB };