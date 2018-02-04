const express = require('express');
const app = express();
const articles = require('./articles');
const path = require('path');
const md = require('markdown-it')()

app.all('/*.md', function (req, res){
res.render('articles',{
  title:'Error',
  body: '',
  a: '',
  h1: 'Aðgangur bannaður',
  p: md.render('# Bannað að opna md skjöl')
});
});



const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('./articles/img'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(articles);
console.log(path.join(__dirname, 'views'));

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
