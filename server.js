// server.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport');
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set EJS as the view engine
app.set('view engine', 'pug');

// mongoose.connect('mongodb://localhost:27017/fullstack-web-app', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://127.0.0.1:27017/fullstack-web-app', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/image', imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});