const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const { SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: 'not token provided' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ success: false, message: 'token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return (
      res.status(401).json * { success: false, message: 'token malformatted' }
    );
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'token invalid' });
    }

    req.id = decoded.id;
    return next();
  });
};
