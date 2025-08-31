import express from 'express'
import { Login } from '../controler/LoginControler.js';

const loginRouter = express.Router();

loginRouter.post('/' , Login)

export default loginRouter;