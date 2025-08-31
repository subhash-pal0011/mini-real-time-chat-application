import express from 'express';
import { Search } from '../controler/SerchControler.js';
import { isLogin } from '../middleware/isLogin.js';

const searchRouter = express.Router();

searchRouter.get('/' , isLogin, Search);

export default searchRouter