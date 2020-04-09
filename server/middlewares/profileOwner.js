import authhelper from '../helpers/authHelpers';

const profileOwner = async (req, res, next) => {
  const { username } = req.params;
  const { token } = req.headers;
  const user = await authhelper.findUser({ username });
  const data = authhelper.verifyToken(token);
  if (user !== null) {
    if (data.username === username || data.id === user.id) {
      next();
    } else {
      res.status(401).send({
        status: 401,
        message: "you don't have permission to access the specified user profile",
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: "the specified username doesn't exist",
    });
  }
};

export default profileOwner;
