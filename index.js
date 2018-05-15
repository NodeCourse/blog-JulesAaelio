const express = require('express');
const db = require('./database');
const app = new express();
app.set('view engine', 'pug');
app.use(express.static('public'));


console.log("App started at " , new Date().toLocaleString());

app.use((req,res) => {
    res.render('index');
});



db.Article.sync().then(()=> {
    return db.Article.findAll().then(r => {
        console.log(r);
    });
}).then(r =>{
    console.log(r);
}).then(r => {
    return db.Article.create({
       title:'test',
       content:'testee',
    });
});



app.listen(3000);