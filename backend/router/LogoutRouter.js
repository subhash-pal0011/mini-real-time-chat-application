// routes/LogoutRouter.js
import express from 'express';
import { Logout } from '../controler/LogoutControler.js';

const logoutRouter = express.Router();

logoutRouter.post('/', Logout); // POST /api/logout

export default logoutRouter;

