const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/index.js").User;

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Expired Access Token" });
    }
    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId)
        .exec()
        .then(user => {
            for (let i = 0; i <= user.roles.length; i++) {
                if (user.roles[i] === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" })
            return;
        })
        .catch(err => {
            console.log(err);
        })

}


const authJwt = {
    verifyToken,
    isAdmin
}

module.exports = authJwt;