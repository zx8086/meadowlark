const express = require('express')
const app = express()

const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const fortune = require('./lib/fortune.js')

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddlware)

// const port = process.env.PORT || 3010

app.get('/', handlers.home)

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get('/section-test', handlers.sectionTest)

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