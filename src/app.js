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


module.exports = app;