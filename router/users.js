const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = require('../app/controller/users')
const controller = require('../app/controller')

router.get('/users', controller.users.get)
router.get('/userdetail', controller.users.getProfile)
router.get('/users/:id', controller.users.getById)
router.post('/users/', controller.users.create)
router.put('/users/:id', controller.users.update)
router.delete('/users/:id', controller.users.destroy)

// router.get('/v2/users', controller.usersV2.get)
// router.get('/v2/users/:id', controller.usersV2.getById)
// router.post('/v2/users/', controller.usersV2.create)
// router.put('v2//users/:id', controller.usersV2.update)
// router.delete('/v2/users/:id', controller.usersV2.destroy)

module.exports = router;
