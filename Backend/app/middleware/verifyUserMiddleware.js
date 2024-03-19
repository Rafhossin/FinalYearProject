import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyUserMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the request cookies
    const token = req.cookies.token;
    if (!token) {
      // If no token is found, respond with a 401 Unauthorized status code
      return res.status(401).json({ message: "Token not found" });
    }

    // Verify the token using jwt.verify and your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally log the decoded token for debugging
    console.log("Decoded JWT:", decoded);

    // Attach the decoded token (user information) to the request object
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    // Respond with a 401 Unauthorized status if token verification fails
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
export default verifyUserMiddleware;
