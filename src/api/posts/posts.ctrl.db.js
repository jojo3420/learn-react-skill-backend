
/*
   Controller role
 */

const Post = require("models/post");
const Joi = require("joi");

const { ObjectId } = require("mongoose").Types;

/*
 Params ObjectId  Validation
 */
exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request.
    return null;
  }

  // next() 를 리턴해야 ctx.body 가 제대로 설정 된다고 한다.
  return next();
};


/*
포스트 작성
method: POST  URL: /api/posts
body: {title, body}
application/json
 */
exports.write = async (ctx) => {

  // validation 스키마 생성 
  const schema = Joi.object().keys({
    title: Joi.string().required(),  //required: 필수 
    body: Joi.string().required(),   
    tags: Joi.array().items(Joi.string()).required(),
  });
  // 첫번째 파라미터: 검증할 객체, 두번째 는 스키마 
  const  result = Joi.validate(ctx.request.body, schema);

  if(result.error) {
    ctx.state = 400;
    ctx.body = result.error; 
    return;
  }


  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save(); // 데이터베이스에 등록
    ctx.body = post;
  }catch (e) {
    ctx.throw(e, 500);
  }


};

exports.list = async (ctx) => {

  try {
    // .exec() 메서드를 실행해야 실제로 쿼리가 실행됨
    const posts = await Post.find().exec();
    ctx.body = posts;

  }catch (e) {
    ctx.throw(e, 500);
  }
};


exports.read = async (ctx) => {

  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  }catch(e) {
    ctx.throw(e, 500);
  }
};


exports.update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
      // 이 값을 설정해야 업데이트도니 객체를 반환
      // 설정하지 않으면 업데이트 되기 이전 객체를 반환
    }).exec();

    if (!post) {
      ctx.state = 200;
      ctx.body = {
        message: '포스트를 찾을 수 없습니다.'
      };
    }
    ctx.body = post;

  }catch(error) {
    ctx.throw(error, 500);
  }

};

exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {

    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 200;
      ctx.body = {
        message: '포스트를 찾을 수 없습니다.',
      };
      return;
    }
    await Post.findByIdAndRemove(id);
    ctx.status = 200;
    ctx.body = {
      message: '삭제 성공'
    };
  } catch (error) {
    ctx.throw(error, 500);
  }

};

