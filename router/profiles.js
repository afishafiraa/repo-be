const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = require('../app/controller/users')
const controller = require('../app/controller')

router.get('/profiles', controller.profiles.get)
router.post('/profiles', controller.profiles.create)

module.exports = router;