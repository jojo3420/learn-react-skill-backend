
// environment config loading  
require('dotenv').config();
const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey,
} = process.env;

// lib import 
const Koa = require('Koa');
const Router = require('koa-router');
const bodyParer = require('koa-bodyparser');
const mongoose = require('mongoose');

// doc => https://github.com/koajs/session
const session = require('koa-session');


// router module import
const api = require('./api');

const app = new Koa();
const router = new Router();


// 어플리케이션 최상위 루트 홈 설정
router.get('/', (ctx) => {
  ctx.body = 'app root home';

});

// Node 의 Promise 를 사용하도록 설정
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((e) => {
    console.error(e);
});


// api module router 설정
router.use('/api', api.routes()); // api route

// router settings 전에 bodyParser 적용
app.use(bodyParer());

// 세션/키 적용: sesison cinfigrations
const sessionConfig = {
  maxAge: 86400000, // one day,
  signed: true // default true setting
};

// use session with config
app.use(session(sessionConfig, app));
// session key setting
app.keys = [signKey];


// router settings
app.use(router.routes()).use(router.allowedMethods());


// 어플리케이션 리스닝
app.listen(port, ()=> {
  console.log('listening to port:' + port);
});


