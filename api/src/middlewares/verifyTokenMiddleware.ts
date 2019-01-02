const devToken : string = "5bfe0efad7d4623c960d42cc";

const verifyTokenMiddleware = async (req, res, next): Promise<any> => {
  const token: string = req.query.token;
  if (!token) {
    return res.status(403).send({
        error: 'Missing token.',
        data: []
    });
  }

  if (token !== devToken) {
    return res.status(403).send({
        error: 'Invalid token.',
        data: []
    });
  }

  next();
};

export default verifyTokenMiddleware;
