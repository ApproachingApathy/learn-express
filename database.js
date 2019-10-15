const pgp = require('pg-promise')();
const db = pgp('postgres://localhost:5432/express_anime_app')

async function  getUserFromEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email])
}

async function registerUser(req) {
    return db.none('INSERT INTO users (email, username, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5);',
        [req.body.email, req.body.username, req.body.first_name, req.body.last_name, req.body.password])
}
module.exports = {
    getUserFromEmail:getUserFromEmail,
    registerUser:registerUser,
}
