require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport)
const fileUpload = require('express-fileupload')

const app = express()

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3000'
// }));
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

app.use(express.json());
app.use(require('./routes'));

const port = 3000

console.log('     ___  _______  __   __  _     _  ___   _______  __   __  __   __  _______ \r\n    |   ||   _   ||  |_|  || | _ | ||   | |       ||  | |  ||  |_|  ||       |\r\n    |   ||  |_|  ||       || || || ||   | |_     _||  |_|  ||       ||    ___|\r\n    |   ||       ||       ||       ||   |   |   |  |       ||       ||   |___ \r\n ___|   ||       ||       ||       ||   |   |   |  |       ||       ||    ___|\r\n|       ||   _   || ||_|| ||   _   ||   |   |   |  |   _   || ||_|| ||   |___ \r\n|_______||__| |__||_|   |_||__| |__||___|   |___|  |__| |__||_|   |_||_______|');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})