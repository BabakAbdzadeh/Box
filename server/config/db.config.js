require('dotenv').config();

const username = process.env.DB_USER;
const password = process.env.DB_PASS;

module.exports = {
    username: username,
    password: password,
    HOST: "database.ithr0wo.mongodb.net",
    DB: "box"
};