import express from 'express';
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/postController.js';
import upload from '../utils/uploadFile.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router
  .get('/',
    verifyToken,
    upload.single('picture'),
    getFeedPosts
)
  
router
  .get('/:userId/posts',
    verifyToken,
    upload.single('picture'),
    getUserPosts
  )

router
  .post('/',
    verifyToken,
    upload.single('picture'),
    createPost
)

router
  .patch('/:id/like',
    verifyToken,
    upload.single('picture'),
    likePost
  )



export default router;