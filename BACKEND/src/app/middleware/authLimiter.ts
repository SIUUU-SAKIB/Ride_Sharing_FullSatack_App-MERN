import { Request, Response } from "express";
import rateLimit from "express-rate-limit";



const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,

  handler: (req:Request, res:Response) => {
    console.log("RATE LIMIT HIT 🚫");

    res.status(429).json({
      success: false,
      message: "Too many requests. Try again after 5 minutes.",
    });
  },
});
const loginLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 50,

  handler: (req:Request, res:Response) => {
    console.log("RATE LIMIT HIT 🚫");

    res.status(429).json({
      success: false,
      message: "Too many requests. Try again after 5 minutes.",
    });
  },
});

export const authLimit = {registerLimiter, loginLimiter}