const { Router } = require('express');

const { getUsers, 
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userControllers')

const router = Router();

router.get('/get', getUsers); // feth or get the users
router.post('/save', createUser); // create/add user
router.put('/update/:id', updateUser); // update the user base on the id 
router.delete('/delete/:id', deleteUser); // delete the user base on the id 

module.exports = router;
