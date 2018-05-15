const sequelize = require('sequelize');
const db = new sequelize('nodetest','datauser','toto',{
    host: 'localhost',
    dialect: 'mysql'
});

db.authenticate().then(r => {
    console.log("db connection established");
}).catch(e => {
    console.log("Error while establishing db connection");
    console.error(e);
});


const Article = db.define('article', {
    title: { type: sequelize.STRING },
    content: { type: sequelize.STRING }
});

module.exports.db = db;
module.exports.Article = Article;