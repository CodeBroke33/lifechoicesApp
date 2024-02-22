import { connection as db } from "../config/config.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../Middleware/AuthenticateUser.js";

class Users{
    fetchUsers(req, res){
        const qry = `SELECT userID, firstName, lastName, userAge, gender, emailAdd, userRole
                    FROM Users;`
        db.query(qry,(err, results)=>{
            if(err)throw err
            res.json({status: res.statusCode, results})
        })
    }
    fetchUser(req, res){
        const qry = `SELECT userID, firstName, lastName, userAge, gender, emailAdd, userPwd, userRole
                    FROM Users
                    SET ?
                    WHERE userID = ${req.params.id}`
    
        db.query(qry,(err, results)=>{
            if(err)throw err
            res.json({status: res.statusCode, results})
        })
    }

    async createUser(req, res){
        // Payload
        let data = req.body
        data.userPwd = await hash(data?.userPwd,10)
        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }
        const qry = `INSERT INTO Users SET?;`

        db.query(qry, [data], (err)=>{
            if(err) {
                res.json({
                    status: res.statusCode,
                    msg: 'This email address already exists'
                })
            }else {
                // Create token
                let token = createToken(user)
                res.json({
                    status: res.statusCode, 
                    token,
                    msg: "You are registered successfully"
                })
            }
        })
    }

    async deleteUser(req, res) {
        let data = req.body;
        const qry = `
            DELETE FROM Users
            WHERE userID = ${req.params.id};  
        `;
        db.query(qry, [data], (err) => {
            if (err) {
                console.error('Error deleting user:', err);
                res.status(500).json({
                    status: 500,
                    msg: 'Failed to delete user. Internal Server Error.'
                });
                
            } else {
                res.status(200).json({
                    status: 200,
                    msg: 'User deleted successfully.'
                });
            }
        });
    }

    //     login(req,res) {
    //         const {emailAdd, userPwd} = req.body
    //         const qry = `SELECT * FROM Users WHERE emailAdd=?`
    //         db.query(qry,[emailAdd] ,(err, results)=> {
    //             if (err) throw err
    //             if (!results.length) {
    //                 return res.status(401).send({
    //                     status: 401,
    //                     error: 'Invalid Email or Password'
    //                 }) 
    //             }else{
    //                 // compare password with hashed password in database
    //                 const validPassword = bcrypt.compareSync(userPwd, results[0].userPwd)
    //                 if(!validPassword){
    //                     return res.status(401).send({
    //                         status: 401,
    //                         error: "Invalid Email or Password"
    //                     })
    //             }
    //             }
    //             let token = jwt.sign({
    //                 userID: results[0].userID,
    //                 email: results[0].emailAdd
    //             }, process.env.JWT_SECRET, { expiresIn: "3h"})
    //             res.cookie("token", token, {httpOnly: true}).status(200).send({
    //                 status: 200,
    //                 token: token,
    //                 userInfo: results[0],       

    //     })
    // }
    //     }
}

export {
    Users
}