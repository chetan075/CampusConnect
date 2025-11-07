const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // accept token from Authorization header OR httpOnly cookie
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies && req.cookies.token;

    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (cookieToken) {
        token = cookieToken;
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = protect;