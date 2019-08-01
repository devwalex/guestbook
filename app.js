const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/guestbook', {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected.....');
}).catch(err => console.log(err));

// Handlebars MiddleWare
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// BodyParser MiddlwWare
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Flash Middleware 
app.use(flash());

// Load Guest Model
require('./models/Guest');
const Guest = mongoose.model('guest')

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Index Route --View
app.get('/', (req, res) => {
    res.render('index');
});

// Index Routr -- Post
app.post('/', (req, res) => {
    let errors = [];
    if (!req.body.fullname) {
        errors.push({
            text: 'Please enter your name'
        });
    }
    if (!req.body.email) {
        errors.push({
            text: 'Please enter your email'
        });
    }
    if (!req.body.comment) {
        errors.push({
            text: 'Please enter a comment'
        })
    }
    if (errors.length > 0) {
        res.render('/', {
            errors: errors,
            fullname: req.body.fullname,
            email: req.body.email,
            comment: req.body.comment
        })
    } else {
        const newGuest = {
            fullname: req.body.fullname,
            email: req.body.email,
            comment: req.body.comment
        }
        new Guest(newGuest)
            .save()
            .then((guest) => {
                req.flash('success_msg', 'Guest Added Sucessfully')
                res.redirect('all-guest')
                console.log('saved', guest);
            })
    }

});

// Edit Route -- View
app.get('/edit', (req, res) => {
    res.render('edit');
});

// All Guest Route -- View
app.get('/all-guest', (req, res) => {
    res.render('all-guest');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});