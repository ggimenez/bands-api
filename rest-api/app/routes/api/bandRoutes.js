/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const BandController = require('../../controller/bandController');
const bandController = new BandController();

/**
 * Band Entity routes
 */
router.get('/count', function (req, res) {
    bandController.countAll(res);
});

router.get('/exists/:name', function (req, res) {
    bandController.exists(req, res);
});

router.get('/:name', function (req, res) {
    bandController.findById(req, res);
});

router.get('/', function (req, res) {
    bandController.findAll(res);
});

router.put('/:name', function (req, res) {
    bandController.update(req, res);
});

router.post('/', function (req, res) {
    bandController.create(req, res);
});

router.delete('/:name', function (req, res) {
    bandController.deleteById(req, res);
});

module.exports = router;