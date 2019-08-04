if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb+srv://devwalex:dev@walex.com@cluster0-2ep4j.mongodb.net/test?retryWrites=true&w=majority'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost:27017/guestbook'
    }
}