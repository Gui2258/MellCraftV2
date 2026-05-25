import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getRole } from '@/lib/auth'
import { auth } from '@clerk/nextjs/server'

const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? 'product-images'
const PROJECT_REF = process.env.NEXT_PUBLIC_SUPABASE_URL!
  .replace('https://', '')
  .replace('.supabase.co', '')

const s3 = new S3Client({
  region: 'us-east-1',
  endpoint: `https://${PROJECT_REF}.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY!,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY!,
  },
  forcePathStyle: true,
})

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const role = await getRole()
  if (!['seller', 'admin'].includes(role)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return Response.json({ error: 'No file provided' }, { status: 400 })

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
  }

  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: path,
      Body: buffer,
      ContentType: file.type,
    }),
  )

  const publicUrl = `https://${PROJECT_REF}.supabase.co/storage/v1/object/public/${BUCKET}/${path}`
  return Response.json({ url: publicUrl, path })
}
