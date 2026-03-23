import cloudinary from "./cloudinary";

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(file.buffer);
  });

  return result.secure_url;
};