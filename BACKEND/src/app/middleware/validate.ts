import { NextFunction, Request, Response } from "express"
import { ZodAny, ZodObject } from "zod"

export const validateZodSchema =
  (zodSchema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = req.body?.data
        ? JSON.parse(req.body.data)
        : req.body;

      const files = req.files as {
        vehicleImage?: Express.Multer.File[];
        licenseImage?: Express.Multer.File[];
      };

      const payload = {
        ...parsedBody,
        vehicleImage: files?.vehicleImage?.[0],
        licenseImage: files?.licenseImage?.[0],
      };

      req.body = await zodSchema.parseAsync(payload);

      next();
    } catch (error) {
      next(error);
    }
  };