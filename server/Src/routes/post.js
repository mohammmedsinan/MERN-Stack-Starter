import express from 'express';
import { createPost, deletePost, getAllPosts, updatePost } from '../controllers/post.js';

const router = express.Router();

router.post('/get', getAllPosts);
router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

export default router;
