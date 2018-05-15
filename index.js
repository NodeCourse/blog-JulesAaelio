const express = require('express');
const sequelize = require('sequelize');
const app = new express();
app.set('view engine', 'pug');
app.use(express.static('public'));

const db = new sequelize('nodetest','datauser','toto',{
    host: 'localhost',
    dialect: 'mysql'
});
db.authenticate().then(r => {
    console.log(r);
}).catch(e => {
    console.log(e);
});

console.log("App started at " , new Date().toLocaleString());

app.use((req,res) => {
    res.render('index');
});

app.listen(3000);