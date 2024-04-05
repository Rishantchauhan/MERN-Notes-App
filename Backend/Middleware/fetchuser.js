const jwt = require('jsonwebtoken');
const JWT_SECRET = "RishantJwt@";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Invalid Token');

    try {
        const data = jwt.verify(token, JWT_SECRET);
        //console.log(data);
        req.user = data.id;
        
        next();
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
}
module.exports = fetchuser;