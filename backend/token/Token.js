import jwt from 'jsonwebtoken';

const jwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  // JWT_SECRET .env file mea hii.
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 👉 “It will expire after 30 days.
    sameSite: 'Strict',
    secure: true,
  });
};

export default jwtToken;



