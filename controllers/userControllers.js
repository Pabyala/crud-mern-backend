const UserModel  = require('../models/userModel');

// fetch or get the users
const getUsers = async (req, res) => {
    try {
        const dataResponse = await UserModel.find();
        if(!dataResponse.length) return res.status(204).json({ message: 'No users found.'})
        res.status(200).json(dataResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Something went wrong" });
    }
}


// create/add new user
const createUser = async (req, res) => {
    const { name, email, phoneNumber } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with the same email already exists." });
        }

        const dataResponse = await UserModel.create({name, email, phoneNumber});
        res.status(201).json(dataResponse);
        console.log('Saved Successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Something went wrong" });
    }
}


// update user base on id
const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, phoneNumber } = req.body;

    try {
        const currentUser = await UserModel.findById(id);
        if (currentUser.email !== email) {
            const isDuplicate = await UserModel.findOne({ email });
            if (isDuplicate) {
                return res.status(400).json({ message: "User with the same email already exists." });
            }
        }

        const dataResponse = await UserModel.findByIdAndUpdate(id, {name, email, phoneNumber})
        if (!dataResponse) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(dataResponse);
        console.log('Updated Successfully'); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Something went wrong" });
    }
}

// delete user base on id
const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const dataResponse = await UserModel.findByIdAndDelete(id)
        if (!dataResponse) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(dataResponse);
        console.log('Deleted Successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, message: "Something went wrong" });
    }
}

module.exports = { 
    getUsers, 
    createUser,
    updateUser,
    deleteUser
}