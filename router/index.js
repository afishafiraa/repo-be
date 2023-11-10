const express = require('express');
const router = express.Router();

const users = require('./users');
const profiles = require('./profiles');
const accounts = require('./accounts');
const transactions = require('./transactions');
const auth = require('./auth');
const media = require('./media');

router.use(users);
router.use(profiles);
router.use(accounts);
router.use(transactions);
router.use(auth);
router.use(media);
// router.use();

module.exports = router;
