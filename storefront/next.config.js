const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: (() => {
      const patterns = [
        { protocol: "http", hostname: "localhost" },
        // {
        //   // Note: needed to serve images from /public folder
        //   protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https")
        //     ? "https"
        //     : "http",
        //   hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(
        //     /^https?:\/\//,
        //     ""
        //   ),
        // },
        {
          protocol: "https",
          hostname: "bucket-production-2b37.up.railway.app",
        },
        {
          protocol: "https",
          hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "medusa-server-testing.s3.amazonaws.com",
        },
        {
          protocol: "https",
          hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
        },
      ]

      const safeParseHostname = (value) => {
        if (!value) return null
        try {
          const hasProtocol = /^https?:\/\//i.test(value)
          const url = new URL(hasProtocol ? value : `https://${value}`)
          return {
            protocol: url.protocol.replace(":", ""),
            hostname: url.hostname,
          }
        } catch (_) {
          return null
        }
      }

      // Public base URL (serving assets from same origin)
      const base = safeParseHostname(process.env.NEXT_PUBLIC_BASE_URL)
      if (base) patterns.push(base)

      // Medusa backend URL (when using local-file for product media)
      const medusa = safeParseHostname(
        process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
      )
      if (medusa)
        patterns.push({ protocol: "https", hostname: medusa.hostname })

      // MinIO endpoint (bucket storage for media)
      if (process.env.NEXT_PUBLIC_MINIO_ENDPOINT) {
        patterns.push({
          protocol: "https",
          hostname: "bucket-production-2b37.up.railway.app",
        })
      }

      return patterns
    })(),
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },
}

module.exports = nextConfig
