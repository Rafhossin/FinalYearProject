import express from "express";

const router = express.Router();

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("userName");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
