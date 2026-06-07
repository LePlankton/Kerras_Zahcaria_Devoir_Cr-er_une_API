require('dotenv').config();
const connectDB = require('./config/db');

const express = require('express');
const app = express();
connectDB();

const authMiddleware = require('./middleware/auth');

app.use(express.json());
app.use('/catways', authMiddleware, require('./routes/catways'));
app.use('/catways', authMiddleware, require('./routes/reservations'));
app.use('/users', authMiddleware, require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


