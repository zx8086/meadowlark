const fortune = require('./fortune')

exports.home = (_req, res) => res.render('home')

exports.about = (_req, res) => res.render('about', { fortune: fortune.getFortune() })

exports.notFound = (_req, res) => res.render('404')

// Express recognizes the error handler by way of its four
// argumetns, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (_err, _req, res, _next) => res.render('500')
/* eslint-enable no-unused-vars */