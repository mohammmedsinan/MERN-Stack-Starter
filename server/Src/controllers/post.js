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
export const getAllPosts = async (req, res) => {
  const BodyReq = req.body.name;
  try {
    //search if the user didn't send any filter
    if (BodyReq === undefined) {
      //return all the posts
      await Post.find({}).then((post) => {
        res.status(201).json({
          message: 'Get all posts work successfully',
          data: post,
          total: post.length,
        });
      });
    } else {
      //return posts by the filter that sent from front-end
      console.log(BodyReq);
    }
  } catch (err) {
    res.status(401).json({
      message: "Get post didn't work, something went wrong",
      err: err,
    });
  }
};
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
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.deleteOne({ _id: id }).then((e) => {
      res.status(201).json({
        message: 'deleted this post successfully',
        data: e,
      });
    });
  } catch (err) {
    res.status(404).json({
      message: "This id isn't found there sorry!",
      ErrorData: err,
    });
  }
};
