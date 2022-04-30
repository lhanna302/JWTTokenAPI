const path = require('path');
require('dotenv').config( {path:path.resolve(__dirname,'../.env')});
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const authenticateToken = require('../middleware/authentication');

router.get('/users/:id', authenticateToken, async (req, res) => {
    try{
        const row = await userService.getUserByUserId(req.params.id);
        if(row == null){
            res.sendStatus(400);
        }
        if(row.length == 0){
            res.sendStatus(404);
        }
        else{
            res.json(row);
        }
    }
  
    catch(err){
        console.error(`Error while retrieving location information for ${req.params.id}`, err.message);
        res.sendStatus(500);
    }
});

router.get('/users', authenticateToken, async (req, res) => {
    try{
        const row = await userService.getUserByEmail(req.query.email);
        if(row == null){
            res.sendStatus(400);
        }
        else if(row.length == 0){
            res.sendStatus(404);
        }
        else{
            res.json(row);
        }
    }
  
    catch(err){
        console.error(`Error while retrieving location information for ${req.params.id}`, err.message);
        res.sendStatus(500);
    }
});


router.post('/signup', async function(req, res, next) {
    try{
        const user = req.body.user;
        const existingUser = await userService.getUserByEmail(user.email);
        if(existingUser == '') {
            const createdUser = await userService.create(user);
            if(createdUser != null) {
                res.sendStatus(201);
            }
            else{
                res.sendStatus(400);
            }
        }
        else{
            res.sendStatus(200);
        }
    }
    catch(err){
        console.error(`Error while signing up`, err);
        res.sendStatus(500);
    }
});


router.post('/login', async function(req, res) {
    try{
        const user = req.body.user
        try{
            const { email, password } =  user;
            const isVerifiedUser = await userService.verifyUserAuthentication(email, password);
            if(isVerifiedUser == null) res.sendStatus(400);
            else if(!isVerifiedUser) res.sendStatus(401);
            else {
                const token = generateAccessToken(user);
                res.json({ accessToken: token});
            }
        }
        catch(err){
            console.error(`Error while attempting user authentication`, err);
        }
    }
    catch(err){
        console.error(`Error while signing up`, err)
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7200s'});
}

module.exports = router;