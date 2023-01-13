import Post from '../models/post.js';

//Create Post
export const createPost = async (req, res) => {
  const postContext = req.body;
  const createNewPost = new Post(postContext);
  try {
    await createNewPost.save().then((postData) => {
      res.status(201).json({
        message: 'Post Created Successfully',
        data: postData,
      });
    });
  } catch (err) {
    res.status(401).json({
      message: 'create post failed',
      error: err,
    });
  }
};
//Get All the posts
export const getAllPosts = async (req, res) => {};
//Update post
export const updatePost = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const post = await Post.findOneAndUpdate({ _id: id }, { ...data });
    await post.save((err) => {
      if (err) res.json(err);
      res.json(data);
    });
  } catch (err) {
    res.status(401).json({
      message: 'failed update post',
      err,
    });
  }
};
//delete post
export const deletePost = async (req, res) => {};
