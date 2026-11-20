import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Configure Neon S3 client if credentials exist
const s3Endpoint = process.env.AWS_ENDPOINT_URL_S3;
const s3Region = process.env.AWS_REGION || 'us-east-2';
const s3AccessKey = process.env.AWS_ACCESS_KEY_ID;
const s3SecretKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.NEON_STORAGE_BUCKET || 'assets';

const hasNeonStorage = Boolean(s3Endpoint && s3AccessKey && s3SecretKey);

const s3 = hasNeonStorage
  ? new S3Client({
      endpoint: s3Endpoint,
      region: s3Region,
      forcePathStyle: true, // required: Neon uses path-style addressing
      credentials: {
        accessKeyId: s3AccessKey!,
        secretAccessKey: s3SecretKey!,
      },
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Verify it is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Uploaded file must be an image (PNG, JPG, WEBP, etc.)' },
        { status: 400 }
      );
    }

    // Convert arrayBuffer to Node Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize base name and create unique timestamped filename
    const originalExt = path.extname(file.name) || '.jpg';
    const cleanBase = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const fileName = `${cleanBase || 'upload'}-${Date.now()}${originalExt.toLowerCase()}`;

    let publicUrl = '';

    if (s3) {
      // Upload to Neon Object Storage
      const objectKey = `uploads/${fileName}`;
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
          Body: buffer,
          ContentType: file.type,
          CacheControl: 'public, max-age=31536000, immutable',
        })
      );

      // S3 path-style public URL on Neon
      publicUrl = `${s3Endpoint!.replace(/\/$/, '')}/${bucketName}/${objectKey}`;
    } else {
      // Fallback to local storage if S3 credentials not provided
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      publicUrl = `/uploads/${fileName}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      storage: s3 ? 'neon-object-storage' : 'local',
      size: file.size,
      mimeType: file.type,
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
