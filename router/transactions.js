const express = require('express');
const router = express.Router();
// const { get, getById, create, destroy } = require('../app/controller/users')
const controller = require('../app/controller')

router.get('/transactions', controller.transactions.get)
router.get('/transactions/:d', controller.transactions.getById)
router.post('/transactions', controller.transactions.create)

module.exports = router;
