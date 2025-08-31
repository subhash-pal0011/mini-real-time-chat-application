import express from 'express'
import { ChatProfile } from '../controler/ChatProfileControler.js';
import { isLogin } from '../middleware/isLogin.js';

const chatProfile = express.Router();

chatProfile.get('/', isLogin, ChatProfile);

export default chatProfile;