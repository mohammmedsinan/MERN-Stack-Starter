import mongoose from 'mongoose';

const Post = mongoose.Schema({
  text: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const postsData = mongoose.model('post', Post);
export default postsData;
