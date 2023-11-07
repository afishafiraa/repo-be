const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = require('../app/controller/users')
const controller = require('../app/controller')
const { auth } = 
    require('../utils/jwt')

router.get('/api/users', controller.users.get)
router.get('/api/userdetail', controller.users.getProfile)
router.get('/api/users/:id', controller.users.getById)
router.post('/api/users/', auth, controller.users.create)
router.put('/api/users/:id', controller.users.update)
router.delete('/api/users/:id', controller.users.destroy)

// router.get('/v2/users', controller.usersV2.get)
// router.get('/v2/users/:id', controller.usersV2.getById)
// router.post('/v2/users/', controller.usersV2.create)
// router.put('v2//users/:id', controller.usersV2.update)
// router.delete('/v2/users/:id', controller.usersV2.destroy)

module.exports = router;
