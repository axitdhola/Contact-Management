const express = require('express');
const connectMongo = require('./config/mongoConnection');
const errorMiddleware = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dotenv = require('dotenv');

const app = express();

const port = process.env.PORT || 3000;

connectMongo();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);
app.use(errorMiddleware)

app.listen(port, () => console.log('Listening on port 3000'));
