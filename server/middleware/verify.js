import jwt from 'jsonwebtoken';

export const Verify = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({islogin : false});
    try {
        const decode = jwt.verify(token, process.env.JWT_PASS);
        console.log(decode);
        try {
            if (decode.role) {
                req.user = decode;
                next();
            }
        } catch (error) {
            return res.json({islogin : false})
        }
    } catch (error) {
        return res.json({islogin : false})
    }
}