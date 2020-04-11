const checkRole = (req, res, next) => {
  if (req.user.role === 'Super Administrator') {
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Sorry! you don\'t have the permission'
  });
};

export default checkRole;
