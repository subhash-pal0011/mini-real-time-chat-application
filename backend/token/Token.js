// import jwt from 'jsonwebtoken';

// const jwtToken = (userId, res) => {
//        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  // JWT_SECRET .env file mea hii.
//               expiresIn: '30d',
//        });

//        res.cookie('jwt', token, {
//               httpOnly: true,
//               maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days bad expayr ho jayega
//               sameSite: 'Strict',
//               secure: true,
//        });
// };

// export default jwtToken;




import jwt from 'jsonwebtoken';

const JWT_SECRET = 'subhashpal'; // hardcoded, no .env

const jwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'Strict',
    secure: false, // false for dev & localhost
  });
};

export default jwtToken;

