const express = require('express');
const app = new express();
app.set('view engine', 'pug');
app.use(express.static('public'));

console.log("App started at " , new Date().toLocaleString());

app.use((req,res) => {
    res.render('index');
});

app.listen(3000);