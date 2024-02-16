import express from 'express';
import bodyParser from 'body-parser';
import {users} from '../Model/index.js';
import { verifyAToken } from '../Middleware/AuthenticateUser.js';

const userRouter = express.Router();

userRouter.get('/', (req, res)=>{
    try {
        users.fetchUsers(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve users'
        })
    }
})
// Fetch user
userRouter.get('/:id', (req,res)=> {
    try{
        userRouter.fetchUser(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve a user'
        })
    }
})
// Add a user
userRouter.post('/register', bodyParser.json(), (req, res) => {
    try{
        users.createUser(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to add a new user'
        })
    }
})
export{
    userRouter, express
}