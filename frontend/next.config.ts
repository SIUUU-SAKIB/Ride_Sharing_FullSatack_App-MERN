import type { NextConfig } from "next";

const nextConfig: NextConfig = {
allowedDevOrigins: ['192.168.1.108'],
images:{
    remotePatterns:[
        {
            protocol:"https",
            hostname:"res.cloudinary.com"
        },
         {
            protocol:"https",
            hostname:"encrypted-tbn0.gstatic.com"
        }
    ]
}
};

export default nextConfig;
