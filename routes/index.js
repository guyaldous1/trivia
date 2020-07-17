const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {page:'Second Chance!', menuId:'home'})
})

module.exports = (io) => router
