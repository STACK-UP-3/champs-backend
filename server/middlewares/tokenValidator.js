import dotenv from 'dotenv';
import models from '../sequelize/models';
import TokenHelper from '../helpers/tokenHelper';

const { User } = models;
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const verify = TokenHelper.decodeToken(req.header('token'), process.env.JWT_KEY);
    const userExists = await User.findOne({
      where: { email: verify.email }
    });

    if (userExists) {
      req.user = userExists;
      return next();
    }
    return res.status(401).json({ status: 401, error: 'User not recognised. Please create account and try again.' });
  } catch (error) {
    return res.status(400).json({ status: 400, error: 'Malformed/ Incorrect security token ! Check token and try again.' });
  }
};

export default verifyToken;
