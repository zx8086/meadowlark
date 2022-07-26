const express = require('express')

const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')
// const multiparty = require('multiparty')

const bodyParser = require('body-parser')
const credentials = require('./config')
const fortune = require('./lib/fortune.js')
// const flashMiddleware = require('./lib/middleware/flash')

const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const RedisStore = require('connect-redis')(expressSession)

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// app.use(cookieParser(credentials.cookieSecret))
// app.use(expressSession({
//   resave: false,
//   saveUninitialized: false,
//   secret: credentials.cookieSecret,
//   store: new RedisStore({
//     url: credentials.redis.url
//   }),
// }))

const cors = require('cors')
app.use (cors({origin: 'http://localhost:3010'}))

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
  // helpers: {
  //   section: function(name, options) {
  //     if(!this._sections) this._sections = {}
  //     this._sections[name] = options.fn(this)
  //     return null
  //   },
  // },
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
// app.use(weatherMiddlware)
// app.use(flashMiddleware)

// const port = process.env.PORT || 3010

app.get('/', handlers.home)

// handlers for browser-based form submission
// app.get('/newsletter-signup', handlers.newsletterSignup)
// app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
// app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// handlers for fetch/JSON form submission
// app.get('/newsletter', handlers.newsletter)
// app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

// app.post('/contest/vacation-photo/:year/:month', (req, res) => {
//   const form = new multiparty.Form()
//   form.parse(req, (err, fields, files) => {
//     if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
//     console.log('got fields: ', fields)
//     console.log('and files: ', files)
//     handlers.vacationPhotoContestProcess(req, res, fields, files)
//   })
// })

// app.get('/section-test', handlers.sectionTest)

app.get('/about', handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(3010, () => {
        // console.log( `Express started on http://localhost:${port}` + '; press Ctrl-C to terminate.' )
        console.log( `Express started on http://localhost:3010` + '; press Ctrl-C to terminate.' )

    })
  } else {
    module.exports = app
  }