const jwt = require("jsonwebtoken");
function verifyAuth(req, res, next) {
    const token = req.header("authToken");
    if (!token)
        return res.status(401).json({ message: "Access denied" });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}
module.exports = verifyAuth;
//# sourceMappingURL=verifyToken.js.map