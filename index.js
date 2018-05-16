const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./database');
const app = new express();
const passport  = require('./auth')(db.User);

const SECRET = process.env.COOKIE_SECRET_BLOG;

//################CONFIG#######################"
//Set app to use pug
app.set('view engine', 'pug');
//Set public assets dir
app.use(express.static('public'));
//Set urlencoded params to be decoded
app.use(bodyParser.urlencoded({
    extended: true
}));
//Set json body to be decoded.
app.use(bodyParser.json());
app.use(cookieParser(SECRET));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//Log app start
console.log("App started at " , new Date().toLocaleString());
console.log(SECRET);



//############## ROUTES ##################
app.get('/add',(req,res) => {
    res.render('form');
});

app.get('/',(req,res) => {
    displayAll(res);
});

app.post('/vote/up/:id',(req,res) => {
    console.log('Vote up');
    db.UpVote.create().then((a) => {
        return a.setArticle(req.params.id);
    }).then((r)=> {
        findOneArticle(req.params.id).then((r) =>{
            res.send(r);
        });
    }).catch(e => {
        console.error(e);
    })
});

app.post('/vote/down/:id',(req,res) => {
    console.log("Vote down");
    db.DownVote.create().then((a) => {
        return a.setArticle(req.params.id);
    }).then((r)=> {
        findOneArticle(req.params.id).then((r) =>{
            res.send(r);
        });
    }).catch(e => {
        console.error(e);
    })
});

app.post('/comment/:id',(req,res)=>{
    console.log(req.body.content);
    db.Comment.create({
        content: req.body.content,
    }).then(r => {
        return r.setArticle(req.params.id);
    }).then(r => {
        res.send(r);
    })
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

app.get('/login',(req,res) => {
    res.render('login');
});

app.post('/login',
    // Authenticate user when the login form is submitted
    passport.authenticate('local', {
        // If authentication succeeded, redirect to the home page
        successRedirect: '/',
        // If authentication failed, redirect to the login page
        failureRedirect: '/login'
    })
);

function displayAll(res) {
    return db.Article.sync()
        .then(() => {
            db.Article.findAll({
                attributes : {
                    include: [
                        [db.db.literal('(SELECT COUNT(*) FROM upvotes WHERE upvotes.articleId = article.id)' ), "voteupcount"],
                        [db.db.literal('(SELECT COUNT(*) FROM downvotes WHERE downvotes.articleId = article.id)' ), "votedowncount"],
                    ]
                },
                include: {
                    model: db.Comment
                }
            }).then(r => {
                // res.send(r);
                res.render('list', {
                    articles: r
                });
        })
    });
}

function findOneArticle(id){
    return db.Article.findById(id,{
        attributes : {
            include: [
                [db.db.literal('(SELECT COUNT(*) FROM upvotes WHERE upvotes.articleId = article.id)' ), "voteupcount"],
                [db.db.literal('(SELECT COUNT(*) FROM downvotes WHERE downvotes.articleId = article.id)' ), "votedowncount"],
            ]
        },
    });
}

app.listen(3000);