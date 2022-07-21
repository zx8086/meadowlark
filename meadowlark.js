const express = require('express')
const expressHandlebars = require('express-handlebars')

const fortune = require('./lib/fortune.js')

const app = express()

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3010

app.get('/', (req, res) => res.render('home'))
  
app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
})

// custom 404 page
app.use((_req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// custom 500 page
app.use((err, _req, res, _next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`))