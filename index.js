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
                    console.log('Article created')
                }).catch(e => {
                    console.log("ERROR");
                })
            });
    }
    res.send('Test');
});


app.listen(3000);