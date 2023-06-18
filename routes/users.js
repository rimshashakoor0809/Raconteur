import express from 'express';
import { addRemoveFriends, getUser, getUserFriends } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router
  .get('/:id',
    verifyToken,
    getUser)
  .get('/:id/friends',
    verifyToken,
    getUserFriends)
  
  
router
  .patch('/:id/:friendId',
    verifyToken,
    addRemoveFriends)


export default router;