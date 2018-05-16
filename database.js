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
    content: { type: sequelize.STRING },
    upvotes : { type: sequelize.INTEGER, defaultValue: 0},
    downvotes : { type: sequelize.INTEGER, defaultValue: 0}
});

const Vote = db.define('vote', {
   action: {
       type : sequelize.ENUM('up','down')
   }
});
Article.hasMany(Vote);
Vote.belongsTo(Article);

Vote.sync().then((r) => {
   console.log('Vote synced');
}).catch((e) => {
    console.log('Error syncing')
});

module.exports.db = db;
module.exports.Article = Article;