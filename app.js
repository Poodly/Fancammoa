const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const path          = require('path');
const dotenv        = require('dotenv');
// const session       = require('express-session');
// const cookieParser  = require('cookie-parser');
// const passport      = require('passport'); 
// const { sequelize } = require('./src/models');

dotenv.config(); 

// ----------------------------------------- connect routes ----------------------------------------
const pageRouter  = require('./routes/pages.router');


// -------------------------------------------------------------------------------------------------
const app = express();

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');
app.set('views', 'views');
// -------------------------------------------------------------------------------------------------
// sequelize.sync({ force: false })
//     .then ((   ) => { console.log('데이터베이스 연결 성공'); })
//     .catch((err) => { console.log(err); });
// -------------------------------------------------------------------------------------------------
app.use(morgan('dev')); 
app.use(express.static('views'));
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./views")));

// ------------------------------------------ parser -----------------------------------------------
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({ extended:false} ));

// ------------------------------------------ routes -----------------------------------------------
app.use('/', pageRouter); 











// ------------------------------------------ error ------------------------------------------------
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error   = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
// ------------------------------------------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중')
})