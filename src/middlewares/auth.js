const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).send({ error: "Nenhum token foi fornecido" });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: "Token errado" })
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token com formato inválido" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: "Token inválido" });
        }
        req.userId = decoded.id;
        return next();
    });
}