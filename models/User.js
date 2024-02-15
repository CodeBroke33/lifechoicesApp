import {connection as db} from '../db'
import {hash, compare} from 'bcrypt'
import { createToken }
from "../middleware/AuthenticateUser.js"
class User{
    fetchUser(req, res){
        const qry = `
        SELECT userID,firstName,
         lastName, userAge, gender,
          emailAdd, userPwd, userRole
          FROM Users;
        `
    }

}

db.query(qry, (err, results)=>{
    if(err) throw err
    res.json({
        status: res.statusCode, 
        results
    })
})