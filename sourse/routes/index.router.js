const router = require('express').Router();
const Main = require('../views/Main');
const renderTemplate = require('../lib/renderTemplate');

router.get('/', (req, res) => {
    renderTemplate(Main, {}, res)
});

module.exports = router;