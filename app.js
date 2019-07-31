const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening to port: ${port}`);
});