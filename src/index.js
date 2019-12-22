require('dotenv').config();
const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
} = process.env;


const Koa = require('Koa');
const Router = require('koa-router');
const bodyParer = require('koa-bodyparser');
const mongoose = require('mongoose');

const api = require('./api');

const app = new Koa();
const router = new Router();


// 최상위 라우터 홈 설정
router.get('/', (ctx) => {
  ctx.body = 'home';

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


// router settings
app.use(router.routes()).use(router.allowedMethods());


// 어플리케이션 리스닝
app.listen(port, ()=> {
  console.log('listening to port:' + port);
});


