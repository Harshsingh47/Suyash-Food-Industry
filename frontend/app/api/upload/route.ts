import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    // Target upload directory in Next.js public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
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
