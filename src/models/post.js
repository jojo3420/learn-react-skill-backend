const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열 배열
  publishedDate: {
    type: Date,
    // 현재 날짜를 기본값으로 지정
    default: new Date(),
  },
});


// 모델을 만들 때 첫 번째 파라미터로 쓰는 이름은
// 나중에 다른 스키마에서 현재 스키마를 참조해야 하는 상황에서 사용합니다.
module.exports = mongoose.model('Post', Post);
// ==> posts 복수형으로 치환하여 생성
// 이규칙을 따르기 싫으면 3번째 파라미터 지정
// module.exports = mongoose.model('Post', Post, 'custom_book_collection');

