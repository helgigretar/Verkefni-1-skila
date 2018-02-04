/* útfæra greina virkni */
const express = require('express');
const app = express();
const fs = require('fs'),
  fm = require('front-matter'),
  markdown = require('markdown-it')(),
  util = require('util'),
  router = express.Router();
const readFileAsync = util.promisify(fs.readFile);
const readDirAsync = util.promisify(fs.readdir);
/* ná í articles sem er slóð að md skjölunum og myndum*/
const articles = './articles/';
/* read files tekur inn Skjölin og þeim er svo pushað í read. read breytir þeim svo í string og það er sett í fylki og því skilað.*/
function read(file) {
  return readFileAsync(file)
    .then(data => data.toString());
}
var fylki = [];
async function readFiles(files) {
  const result = [];
  for (let i = 0; i < files.length; i++) {
    result.push(await read(files[i]));
  }
  return Promise.all(result);
}

/*Lesa inn aðeins þau skjöl í articles sem enda á .md, semsagt ekki taka með images */
async function readDir(directory) {
  let results = [];
  return readDirAsync(directory)
    .then(file => {
      results = file.filter(file => file.substring(file.length - 3) === '.md');
      for (let i = 0; i < results.length; i++) {
        results[i] = articles.concat(results[i]);
      }
      return results;
    });
}
/*Glóbal breytur*/
/*Strengur er linkurinn sem notandi skrifar*/
var strengur;
/* mapper er fylki af md skjölunum  */
var mapper = [];
/* Þessi router er fyrir forsíðuna */
router.get('/', (req, res) => {

  readDir(articles).then(filename => {

      let skjol = readFiles(filename)
        .then(data => {
          mapper = data.map(files => files = fm(files));
          let mappa = mark(mapper);
          let obj;
          let timer = [];
          let arr = [];
          for (let i = 0; i < mappa.length; i++) {
            let date = new Date(mappa[i].date);
            let timer = date.getDate() + "." + date.getMonth() + " ." + date.getFullYear();
            let title = mappa[i].title;
            let mynd = mappa[i].image;
            let slug = mappa[i].slug;

            obj = {
              time: timer,
              title: title,
              image: mynd,
              slug: slug
            };
            arr.push(obj);
          }

          res.render('index', {
            title: 'Grein',
            sida: arr,
            p: timer,
            h1: 'Greinasafnið',
            a: ' ',
            h4: '',
            h5: '',
          });
        })
        .catch(error => {
          res.render('articles', {
            title: 'Error',
            h1: 'Villa kom upp',
            h4: '',
            p: '',
            h5: '<a href=\' / \'>Til baka </a>',
            a: ''
          });
        });

    })
    .catch(error => {
      res.render('articles', {
        title: 'Error',
        h1: 'Villa kom upp',
        h4: '',
        p: '',
        h5: '<a href=\' / \'>Til baka </a>',
        a: ''
      });
    });

});


/* Router ef notandi skrifar einhvern link
 * Byrjar á að lesa directory, senda það í files og lesa skjölin
 * Ef allt gengur upp þá er skjölunum hent í frontmatter
 * Síðan er strengurinn (linkurinn) borinn saman við md.slugginn
 *      og ef það passar fara á þá siðu annars er 404 villu-síða birt
 * Ef það kemur eh villa sem forritið ræður ekki við s.s.(500 villa), þá er hent fram 500 villu skilaboðum og ekkert virkar*/
router.get('/:data*/', (req, res) => {
  let strengur = req.params.data;
  readDir(articles).then(filename => {
      readFiles(filename)
        .then(data => {
          mapper = data.map(files => files = fm(files));
          var list = [mapper[0].attributes.slug, mapper[1].attributes.slug, mapper[2].attributes.slug, mapper[3].attributes.slug];
          try {
            let results = [];
            /*Category er object sem geymir upplýsingar til þess að birta síður. */
            let category;
            /* Check er tag sem skoðar hvort linkur fannst og ef ekki þá er það = false og þá er birt 404 villusíða*/
            let check = false;
            for (let i = 0; i < list.length; i++) {
              if (strengur === list[i]) {
                let marker = markdown.render(mapper[i].body);
                category = {
                  title: mapper[i].attributes.title,
                  h1: mapper[i].attributes.title,
                  p: marker
                };
                results.push(category);
                check = true;
              }
            }
            if (check === false) {
              notFoundHandler(req, res);
            }
            res.render('articles', {
              title: results[0].title,
              h1: results[0].h1,
              h4: '',
              p: results[0].p,
              h5: '',
              a: '<a href=\' / \'>Til baka</a>'
            });
          } catch (error) {
            notFoundHandler(req, res);
          }
        })
        .catch(error => {
          res.render('articles', {
            title: 'Error',
            h1: 'Villa kom upp',
            h4: '',
            p: '',
            h5: '<a href=\' / \'>Til baka </a>',
            a: ''
          });
        });

    })
    .catch(error => {
      res.render('articles', {
        title: 'Error',
        h1: 'Villa kom upp',
        h4: '',
        p: '',
        h5: '<a href=\' / \'>Til baka </a>',
        a: ''
      });
    });
});

/* Skoðar hvort strengurinn semsagt linkurinn sem notandinn skrifaði sé réttur miðað við sluggin í md skjölunum.
   ef hann er réttur þá skila slugginu annars er skilað tómu fylki. */
function skoda(strengur) {
  let results = [];
  var list = [mapper[0].attributes.slug, mapper[1].attributes.slug, mapper[2].attributes.slug, mapper[3].attributes.slug];
  for (let i = 0; i < list.length; i++) {
    if (strengur === list[i]) {
      const marker = markdown.render(mapper[i].body);
      results.push(mapper[i].attributes.title);
      results.push(list[i]);
      results.push(marker);
    }
  }
  return results;

}
/* Raðar md skjölunum eftir dagsetningu  */
function mark(data) {
  let fylki = [];
  for (let i = 0; i < data.length; i++) {
    fylki[i] = data[i].attributes;
  }
  let sorted = fylki.sort(function(a, b) {
    return Date.parse(a.date) < Date.parse(b.date);
  });
  return sorted;
}
/* Fall sem virkist þegar notandinn skrifar vitlausan link */
function notFoundHandler(req, res, next) {
  let err = markdown.render('# Ó nei efnið finnst ekki!');
  let back = markdown.render('# Til baka');
  res.render('articles', {
    title: 'Error',
    h1: 'Fannst ekki',
    h4: 'Ó nei, efnið finnst ekki!',
    p: '',
    h5: '<a href=\' / \'>Til baka </a>',
    a: ''
  });
}
app.use(notFoundHandler);
module.exports = router;
