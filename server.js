const express = require('express')
  hbs = require('hbs')
  util = require('util')
  fs = require('fs')
  port = process.env.PORT || 3000
// const lodash = require('lodas')

var app = express()

// Populate a variable used in a partial
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear()
})

// create function to make text bold
hbs.registerHelper('makeUpper', (text) => {
  return text.toUpperCase()
})

// Partials can be html or hbs files
hbs.registerPartials(__dirname + '/views/partials',() => {
  var now = new Date().toString()
  // console.log(`Partial load's Date/Time: ${now}!`)
})

// Express settings and middleware (.use calls)
app.set('view engine', 'hbs')

// __dirname saves the folder as the host
app.use(express.static(__dirname + '/public'))

// a custom middleware logger
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `Current Date/Time: ${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  // console.log('Req:' + util.inspect(res,{showHidden: false, depth: null}))
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'I\'m working on it!!'
//   })
// })

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hey welcome to my website!'
  })
})

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

// var router = express.Router();
//
// router.use( (req, res, next) => {
//   console.log(req.method, req.url)
//   next()
// })
//
// router.get('/', (req, res) => {
//   res.send('I\'m the home page')
// })
//
// router.get('/about', (req, res) => {
//   res.send('I\'m the about page')
// })
//
// app.use('/', router)


// app.get('/weather', (req, res) => {
//         console.log(req.params.location)
//     })
//
// app.get('/example/b', function (req, res, next) {
//     console.log('the response will be sent by the next function ...')
//     next()
// }, function (req, res) {
//     res.send('Hello from B!')
// })
//
// var cb0 = function (req, res, next) {
//     console.log('CB0')
//     next()
// }
//
// var cb1 = function (req, res, next) {
//     console.log('CB1')
//     next()
// }
//
// var cb2 = (req, res) => {
//     res.send('Hello from C!')
// }
//
// app.get('/example/c', [cb0, cb2], [cb1])
//
// app.get('/', (req, res) => {
//     res.send('GET request to the homepage')
//     next()
// })
//
// app.get('/location/:location', (req, res) => {
//     res.send(res.params)
// })
//
// app.get('/about', function (req, res) {
//     res.send('about')
// })
//
// // POST method route
// app.post('/', function (req, res) {
//     res.send('POST request to the homepage')
// })

// bind app to local port
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
