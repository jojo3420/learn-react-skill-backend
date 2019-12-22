const Router = require('koa-router');

const api = new Router();

const posts = require('./posts');


api.get('/', (ctx) => {
    ctx.body = 'api home';
});

api.use('/posts', posts.routes());

// export router module 
module.exports = api;
