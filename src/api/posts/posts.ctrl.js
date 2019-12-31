let postId = 1; //id의 초기값

const posts = [{
    id: 1,
    title: '제목',
    body: '내용',
  },

];

/*
포스트 작성
method: POST  URL: /api/posts
body: {title, body}
application/json
 */

exports.write = (ctx) => {
  // REST API의 리퀘스트 바디는
  // ctx.request.body 에서 조회 할수 있음

  const { title, body } = ctx.request.body;

  postId += 1;

  const post = {id: postId, title, body};
  posts.push(post);
  ctx.body = posts;
};

/*
포스트 목록 조회
method: GET
URL: /api/posts
 */
exports.list = (ctx) => {
  ctx.body = posts;
};


/*
특정 포스트 조회
method: GET,
URL: /api/posts/:id
 */
exports.read = (ctx) => {
  // id is string type
  const { id } = ctx.params;
  const post = posts.find((post) => post.id.toString() === id);

  if(!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다!'
    };
    return;
  }
  ctx.body = post;
};

/*
 특정 id 포스트 삭제하기
 method: DELETE
 URL: /api/posts/:id
 */
exports.remove = (ctx) => {

  const { id } = ctx.params;

  // 해당 아이디를 가진 포스트가 배열에서 몇 번째 인지 확인
  const index = posts.findIndex((post) => post.id.toString() === id);
  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }

  // posts = posts.filter((post) => post.id.toString() !== id);
  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/*
 포스트 수정(교체)
 method: PUT,
 URL: /api/posts/:id
 { title, body }

  PUT 메서드는
  전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다

 */
exports.replace = (ctx) => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);
  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다',
    };
    return;
  }

  // 배열의 변경할 객체를 덮어 씌웁니다.
  // 따라서 id 를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
  posts[index] = {
    id: parseInt(id),
    ...ctx.request.body,
  };

  ctx.status = 200;
  ctx.body = posts[index];
};


/*
  포스트 데이터중 일부만 수정
  method: PATCH
  URL: /api/posts/:id
  { title, body }
 */
exports.update = (ctx) => {
  // PATCH 메서드는 주어진 필드만 교체합니다.
  const { id } = ctx.params;

  // 해당 id를 가진 post가 몇 번째인지 확인합니다.
  const index = posts.findIndex(p => p.id.toString() === id);

  // 포스트가 없으면 오류를 반환합니다.
  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.'
    };
    return;
  }

  // 기존 값에 정보를 덮어씌웁니다.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};


// const Post = require('models/post');
