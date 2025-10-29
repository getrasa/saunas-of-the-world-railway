// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    // payloadCloudPlugin(),
    // storage-adapter-placeholder
    s3Storage({
      bucket: process.env.S3_BUCKET || '',
      collections: {
        media: {
          prefix: 'media',
        },
      },
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'ap-southeast-1', // Southeast Asia region
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true, // Critical for MinIO! This fixes DNS lookup errors
      },
    }),
  ],
})
