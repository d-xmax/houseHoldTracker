import jwt from 'jsonwebtoken';
 
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );
};

export default generateToken;
