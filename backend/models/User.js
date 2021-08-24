const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');



// Schema
// the term "schema" refers to the organization 
// of data as a blueprint of how the database is 
// constructed

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },

});

// Populating books the user created it
UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
        
    }
    const salt = await bcrypt.genSalt(10);
    // this refers to the current user
    // console.log(this.password);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// verify password
UserSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
const User = mongoose.model('User', UserSchema)
module.exports = User;
