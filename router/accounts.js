const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = require('../app/controller/users')
const controller = require('../app/controller')

router.get('/accounts', controller.accounts.get)
router.post('/accounts', controller.accounts.create)

module.exports = router;