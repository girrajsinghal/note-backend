import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, return a 400 Bad Request response
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
