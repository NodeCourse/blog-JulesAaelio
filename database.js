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
    voteupcount : {type: sequelize.VIRTUAL},
    votedowncount : {type: sequelize.VIRTUAL}
});

const UpVote = db.define('upvote', {});
const DownVote = db.define('downvote', {});
Article.hasMany(UpVote);
Article.hasMany(DownVote);
UpVote.belongsTo(Article);
DownVote.belongsTo(Article);

UpVote.sync().then((r) => {
   console.log('Vote synced');
}).catch((e) => {
    console.log('Error syncing')
});

DownVote.sync().then((r) => {
    console.log('Vote synced');
}).catch((e) => {
    console.log('Error syncing')
});


module.exports.db = db;
module.exports.Article = Article;
module.exports.UpVote = UpVote;
module.exports.DownVote = DownVote;