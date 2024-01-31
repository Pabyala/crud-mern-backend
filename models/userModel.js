const mongoose = require('mongoose');

// define schema for the type of data to stored in the database
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
    }
},
{
    timestamps: true // Add createdAt and updatedAt fields
})

const UserModel  = mongoose.model("User", dataSchema);

module.exports = UserModel;