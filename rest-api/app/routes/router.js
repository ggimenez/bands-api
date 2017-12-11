/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/band', require('./api/bandRoutes'));

module.exports = router;