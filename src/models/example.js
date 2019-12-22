const mongoose = require('mongoose');

const { Schema } = mongoose;

const Author = new Schema({
  name: String,
  email: String,
});

const Book = new Schema({
  title: String,
  description: String,
  authors: [Author],
  meta: {
    likes: Number,
  },
  // 어떤 데이터도 넣을 수 있는 형식.
  extra: Schema.Types.Mixed
});

