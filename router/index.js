const express = require('express');
const router = express.Router();

const users = require('./users');
const profiles = require('./profiles');

router.use(users);
router.use(profiles);
// router.use();

module.exports = users;
module.exports = profiles;
