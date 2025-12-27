import jwt from 'jsonwebtoken';
 

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000,
    signed: true
  });
  
};

export default generateToken;
