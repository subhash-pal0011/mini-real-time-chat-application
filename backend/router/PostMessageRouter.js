import express from 'express';
import { PostMessage } from '../controler/PostMessage.js';
import { isLogin } from '../middleware/isLogin.js';

const postRouter = express.Router();

postRouter.post('/:id' , isLogin , PostMessage);
 
export default postRouter;