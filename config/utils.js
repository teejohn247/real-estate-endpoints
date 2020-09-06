import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Debug from 'debug';


dotenv.config();
const debug = Debug('http');


dotenv.config();

module.exports = {

encodeToken: (id, name, email, admin) => {
const payload = { id, name, email, admin };
const option = { expiresIn: '1d' };
const secret = process.env.SECRET_KEY;
return jwt.sign(payload, secret, option);
    },
};
