"use strict";

const express = require('express');

const router = express.Router();

require('./routes/userRoutes.js')(router);
require('./routes/noteRoutes')(router);

module.exports = router;