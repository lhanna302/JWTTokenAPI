require('dotenv').config;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const authenticateToken = require('../middleware/authentication');

router.get('/users/:id', authenticateToken, async (req, res) => {
    try{

        const row = await userService.getUserByUserId(req.params.id);
        if(row == null){
            res.send(400);
        }
        if(row.length == 0){
            res.sendStatus(404);
        }
        else{
            res.json(rows);
        }
    }
  
    catch(err){
        console.error(`Error while retrieving location information for ${req.params.id}`, err.message);
        res.send(500);
    }
});

router.get('/users?email=:email', authenticateToken, async (req, res) => {
    try{
        const row = await userService.getUserByEmail(req.query.email);
        if(row == null){
            res.send(400);
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
        res.send(500);
    }
});


router.post('/signup', async function(req, res, next) {
    try{
        console.log('signup');
        const user = req.body.user;
        const existingUser = userService.getUserByEmail(user.email);
        let createdUser;
        if(existingUser == null) {
            createdUser = userService.create(user);
            if(createdUser != null) {
                res.send(201);
            }
            else{
                res.send(400);
            }
        }
    }
    catch(err){
        console.error(`Error while signing up`, err);
        res.send(500);
    }
});


router.post('/login',  authenticateToken, async (req, res) => {
    try{
        const user = req.body.user
        try{
            let username, password = { user };
            const isVerifiedUser = userService.verifyUserAuthentication(username, password);
            if(isVerifiedUser == null) res.send(400);
            if(!isVerifiedUser) res.send(401);
        }
        catch{
            console.error(`Error while attempting user authentication`, err);
        }
        const token = generateAccessToken(user);
        res.json({ accessToken: token});
    }
    catch(err){
        console.error(`Error while signing up`, err)
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7200s'});
}

module.exports = router;