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

const jwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'testsecret', {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'lax', // Strict ko lye ja sakta hai, lcl dev ke liye 'lax' best
    secure: false,   // local dev ke liye false, prod me true
  });
};

export default jwtToken;


