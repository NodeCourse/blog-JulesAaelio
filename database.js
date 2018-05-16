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

const Comment = db.define('comment',{
    content: { type: sequelize.STRING}
});
Article.hasMany(Comment);
Comment.belongsTo(Article);

const UpVote = db.define('upvote', {});
const DownVote = db.define('downvote', {});
Article.hasMany(UpVote);
Article.hasMany(DownVote);
UpVote.belongsTo(Article);
DownVote.belongsTo(Article);

db.sync().then(r => {
   console.log("DB SYNCED");
}).catch(e => {
    console.error(e);
});

module.exports.db = db;
module.exports.Article = Article;
module.exports.UpVote = UpVote;
module.exports.DownVote = DownVote;
module.exports.Comment = Comment;