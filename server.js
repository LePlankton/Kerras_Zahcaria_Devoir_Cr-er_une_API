require('dotenv').config();
const connectDB = require('./config/db');

const express = require('express');
const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views', './views');

const authMiddleware = require('./middleware/auth');

const session = require('express-session');

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/catways', authMiddleware, require('./routes/catways'));
app.use('/catways', authMiddleware, require('./routes/reservations'));
app.use('/users', authMiddleware, require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.use('/', require('./routes/views'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


