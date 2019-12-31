const Router = require('koa-router');

const api = new Router();

const posts = require('./posts');
const auth = require('./auth')


api.get('/', (ctx) => {
    ctx.body = 'api home';
});

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());


// export router module 
module.exports = api;
