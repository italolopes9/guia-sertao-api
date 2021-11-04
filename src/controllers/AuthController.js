const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

const { HashUtil } = require('../utils')

module.exports = {

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: 'Usuário  não encontrado' });

        const checkPassword = await HashUtil.decryptPassword({
            passwordHash: user.password,
            password,
        });
        if (!checkPassword) return res.status(400).send({ error: 'Usuário ou Senha incorretos' });

        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400
        });


        delete user.dataValues.password;

        res.send({ user, token });
    }
};