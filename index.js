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

app.get('/',(req,res) => {
    res.render('index');
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
                    return displayAll(res);
                }).catch(e => {
                    console.log(e);
                    res.status('Shit happened');
                })
            });
    }
});

function displayAll(res){
   return  db.Article.findAll().then(r => {
        res.render('list',{
            articles:r
        });
    })
}

app.listen(3000);