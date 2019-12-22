const Router = require('koa-router');
// const postsCtrl = require('./posts.ctrl');
const postsCtrl = require('./posts.ctrl.db');


const posts = new Router();

// const printRequest = (ctx) => {
//     ctx.body = {
//         method: ctx.method,
//         path: ctx.path,
//         params: ctx.params,
//     };
// };

// posts.get('/', postsCtrl.list);
// posts.get('/:id', postsCtrl.read);
// posts.post('/', postsCtrl.write);
// posts.delete('/:id', postsCtrl.remove);
// posts.put('/:id', postsCtrl.replace);
// posts.patch('/:id', postsCtrl.update);

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id',  postsCtrl.checkObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);

module.exports = posts;
