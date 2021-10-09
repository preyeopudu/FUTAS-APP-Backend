import userService from '../services/userService';
import CustomError from '../utils/CustomError';

const getToken = (req) => {
  const _authorization = req.get('authorization');

  if (typeof _authorization === 'undefined' || !_authorization) {
    throw new CustomError('Auth token missing', 400);
  }

  const authorization = _authorization.split(' ');

  if (authorization.includes('Bearer')) {
    return authorization[1];
  }

  throw new CustomError('Auth token malformed', 400);
};

exports.auth = async (req, res, next) => {
  try {
    const token = getToken(req);
    const decoded = userService.verifyToken(token);
    const user = await userService.findByEmail(decoded.email);

    if (!user) throw new CustomError("User Doesnt't Exist", 404);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const { type } = req.user;
    const isAdmin = type === 'admin';
    if (!isAdmin) {
      throw new CustomError('unauthorized', 401);
    }
    next();
  } catch (error) {
    next(error);
  }
};
