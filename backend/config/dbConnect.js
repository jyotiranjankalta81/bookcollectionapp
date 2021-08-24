const mongoose = require('mongoose');
const dbConnect = () => {
    // connect DB
    // DB id: kalta
    // hLIoNYdBD3voBuG7
    // mongodb+srv://kalta:hLIoNYdBD3voBuG7@cluster0.igtq9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    mongoose.connect(process.env.MONGODB_URL, {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

};
module.exports = dbConnect;