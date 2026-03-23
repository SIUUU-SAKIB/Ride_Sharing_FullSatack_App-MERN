import { v2 as cloudinary } from "cloudinary"
import { enviromentVariables } from "../../config/env"

cloudinary.config({
    cloud_name: enviromentVariables.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: enviromentVariables.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: enviromentVariables.CLOUDINARY.CLOUDINARY_API_SECRET
})

export default cloudinary