// export const Logout = async (req, res) => { 
//        try {
//               res.cookie('jwt', '', {
//                      httpOnly: true,
//                      expires: new Date(0), 
//               });

//               // FRONTEND MEA HUME TO LOGOUT HONE KE BAD EK MESSAGE HI DIKHAN HII KI LOGOUT SUCCSESS
//               res.status(200).json({
//                      success: true,
//                      message: 'Logout successfully ',
//               });
//        } catch (error) {
//               console.error('Logout error:', error.message);
//               res.status(500).json({
//                      success: false,
//                      message: 'Server error during logout',
//               });
//        }
// };





export const Logout = async (req, res) => {
       try {
              res.cookie('jwt', '', {
                     httpOnly: true,
                     expires: new Date(0),
                     sameSite: 'lax', // must match login cookie
                     secure: false,   // local dev
              });

              res.status(200).json({
                     success: true,
                     message: 'Logout successfully',
              });
       } catch (error) {
              console.error('Logout error:', error.message);
              res.status(500).json({
                     success: false,
                     message: 'Server error during logout',
              });
       }
};
