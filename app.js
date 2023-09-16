const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
// Express app
const app = express();

// Connect to MongoDB
const dbURI = process.env.DB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to DB'))
  .catch((err) => console.log(err))


// Set the View Engine or Template Engine
app.set('view engine', 'ejs'); // tells our express application that we want to use EJS as our template engine.

// listen for request
app.listen(3000);

// Third Party Middleware
// app.use(morgan('dev'));
app.use(morgan('tiny'));

// Static Files & Middleware
app.use(express.urlencoded({ extended: true }));
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.static('public'));
// This is a built-in middleware function in Express. It serves static files and is based on serve-static.
// The root argument specifies the root directory from which to serve static assets.
// For more information on the options argument, see express.static.

/*
app.get('/add-diary', (req, res) => {
  const newDiary = new diary({
    title: 'new diary',
    snippet: 'about my new diary',
    body: 'more about my new diary'
  });

  newDiary.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/all-diary', (req, res) => {
  diary.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})
app.get('/single-diary', (req, res) => {
  diary.findById('65057a93b64f47080de27ed5')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})
*/
// Middleware 
/*
app.use((req, res, next) => {
  console.log('New request made:');
  console.log('host:', req.hostname);
  console.log('path:', req.path);
  console.log('method:', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('In the next middleware');
  next();
});
*/

// Please note the res.render() method below. This is how you render a template in expressJS.

app.get('/', (req, res) => {
  // const blogs = [
  //   { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  //   { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  //   { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
  // ];
  // res.render('index', { title: 'Home', blogs });

  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Blog Routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



/*
app.get('/', (req, res) => {
    // res.send("<h1>Home</h1>");
    res.sendFile('./views/index.html', { root: __dirname });
})
app.get('/about', (req, res) => {
    // res.send("<h1>About</h1>");
    res.sendFile('./views/about.html', { root: __dirname });
})
app.get('/contact', (req, res) => {
    // res.send("<h1>Contact</h1>");
    res.sendFile('./views/contact.html', { root: __dirname });
})

// Redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// if no path is matched : 404 page / Not Found Page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})

*/