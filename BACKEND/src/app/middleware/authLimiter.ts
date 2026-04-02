import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,

  handler: (req:Request, res:Response) => {
    console.log("RATE LIMIT HIT 🚫");

    res.status(429).json({
      success: false,
      message: "Too many requests. Try again after 5 minutes.",
    });
  },
});