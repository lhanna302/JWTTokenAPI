const db = require('../connection');
const { v4: uuid4v, validate: isValidUUID } = require('uuid');

async function create(user){
    const { email, username, password } =  user;
    if(isValidEmail(user.email) && isValidUserName(username) && password){
        const userId = uuid4v();
        row = await db.query(`INSERT into user(username, email, user_id, user_password) values ("${username}", "${email}", "${userId}", "${password}");`);
        return row;
    }
    return null;
}

async function getUserByEmail(email){
    if(isValidEmail(email)){
        const row = await db.query(
            `SELECT username, email, user_id from user where email = "${email}";`
        );
        return row;
    }
    return null;
}

async function getUserByUserId(userId){
    if(isValidUUID(userId)){
        const row = await db.query(
            `SELECT username, email, user_id from user where user_id = "${userId}";`
        );
        return row;
    }
    return null;
}

async function verifyUserAuthentication(email, password){
    if(isValidEmail(email)) {
        const data = await db.query(`SELECT user_password from user where email = "${email}"`);
        if(password === data[0].user_password) return true;
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