import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        console.log(decoded)
        req.user = {
            id: decoded.id,
            nisn: decoded.nisn,
            uuid: decoded.uuid,
            email: decoded.email,
            name: decoded.name,
        };
        console.log(req.user)
        next();
    });
};
