import express from 'express';
import { GetMessage } from '../controler/GetMessage.js';
import { isLogin } from '../middleware/isLogin.js';

const getRouter = express.Router();


getRouter.get('/:id' , isLogin, GetMessage);

 
export default getRouter;