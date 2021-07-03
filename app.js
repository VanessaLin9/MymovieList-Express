const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movie: movieList.results })
})

app.get('/movies/:movie_id', (req, res) => {
  console.log('req.params.movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)

  res.render('show', { movie: movie })
})

app.get('/search', (req, res) => {
  console.log('keyword: ', req.query)
  const keyword = req.query.keyword
  const movie = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movie: movie, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`)
})