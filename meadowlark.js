const express = require('express')
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')

// const fortune = require('./lib/fortune.js')

const app = express()

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// const port = process.env.PORT || 3010

app.get('/', handlers.home)

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