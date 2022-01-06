const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader.split(' ')[1];
    if (authHeader) {

        jwt.verify(token.process.env.TOKEN, (err, user) => {
            if (err) res.status(403).json('invalid token')
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json('you are not autheticated')
    }
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();

        } else {
            res.status(403).json('not allowed')
        }

    })
}

const verifyTokenAndAdmn = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();

        } else {
            res.status(403).json('not allowed')
        }

    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmn
};