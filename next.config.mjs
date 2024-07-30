/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true
    },
    images:{
        remotePatterns:[
            {
                hostname:"utfs.io",
            }
        ]
    }
};

export default nextConfig;
