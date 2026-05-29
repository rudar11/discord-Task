const express = require('express');
const cookieparser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const { connectDB } = require('./db/db');
const Service = require('./models/service.models'); 

const app = express();
app.use(cookieparser());
app.use(express.json());
connectDB();

//  /api/v1/auth
app.use('/api/v1/auth', authRouter);

// Isko app.use('/api/v1/auth', authRouter); ke theek upar ya neeche daal de
app.get('/', (req, res) => {
    res.status(200).send(" Backend API is running successfully!");
});


//  Discord command se service ban banane ke liye POST API
app.post('/api/v1/services', async (req, res) => {
    try {
        const { name, price } = req.body;
        const service = await Service.create({ name, price });
        res.status(201).json({ message: "service created", service });
    } catch (error) {
        res.status(500).json({ message: "error creating service", error });
    }
});

module.exports = app;