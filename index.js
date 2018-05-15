const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = new express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


console.log("App started at " , new Date().toLocaleString());

app.get('/add',(req,res) => {
    res.render('form');
});

app.get('/',(req,res) => {
    displayAll(res);
});

app.post('/vote/up/:id',(req,res) => {
   db.Article.findById(req.params.id).then((o) => {
       o.increment('upvotes');
   }).then(r => {
       console.log('Upvoted');
       res.sendStatus(204);
   }).catch(e => {
       console.log('error upvoting');
       console.log(e);
   });
});

app.post('/vote/down/:id',(req,res) => {
    db.Article.findById(req.params.id).then((o) => {
        o.increment('downvotes');
    }).then(r => {
        console.log('Downvoted');
        res.sendStatus(204);
    }).catch(e => {
        console.log('error downvoting');
        console.log(e);
    });
});

app.post('/form_handle',(req,res) => {
    if(req.body && req.body.title && req.body.content) {
        db.Article
            .sync()
            .then(() => {
                db.Article.create({
                    title: req.body.title,
                    content: req.body.content
                }).then(r => {
                    console.log('Article created');
                    res.redirect('/');
                }).catch(e => {
                    console.log(e);
                    res.status('Shit happened');
                })
            });
    }
});

function displayAll(res) {
    return db.Article.sync()
        .then(() => {
            db.Article.findAll({
                order: [db.db.literal('(upvotes - downvotes) DESC') ]
            }).then(r => {
                res.render('list', {
                    articles: r
                });
        })
    });
}

app.listen(3000);