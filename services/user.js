const db = require('../connection');
const UUID = require('uuid');

async function create(user){
    let email, username, password = { user };
    if(isValidEmail(email) && isValidUserName(username) && password){
        const userId = UUID();
        row = await db.query(`INSERT into user(username, email, user_id, user_password) values (${username}, ${email}, ${userId}, ${password});`);
        return row;
    }
    return null;
}

async function getUserByEmail(email){
    if(isValidEmail(email)){
        const row = await db.query(
            `SELECT username, email, user_id from users where email = ${email};`
        );
        return row;
    }
    return null;
}

async function getUserByUserId(userId){
    if(UUID.isValidUUID(userId)){
        const row = await db.query(
            `SELECT username, email, user_id from users where user_id = ${userId};`
        );
        return row;
    }
    return null;
}

async function verifyUserAuthentication(username, password){
    if(isValidUserName(username)) {
        const retrievedPassword = await db.query(`SELECT user_password from users where username = ${username}`);
        if(password === retrievedPassword) return true;
        return false;
    }
    return null;
}

function isValidEmail(email){
    // allegedly complies with RFC 2822. 
    var regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return regex.test(email);
}

function isValidUserName(username){
    if(!username || username === undefined) return false;
    if(username.trim().length === 0) return false;
    return true;
}


module.exports = {
    create,
    getUserByEmail,
    getUserByUserId,
    verifyUserAuthentication,
}