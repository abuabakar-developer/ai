import { NextResponse } from 'next/server';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { verifyToken } from '@/lib/jwt';
import dbConnect from '@/utils/dbConnect';

export const POST = async (req: Request) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let user;
  try {
    user = verifyToken(token) as { id: string; email: string };
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid Token' }, { status: 403 });
  }

  const formData = await req.formData();
  const files = formData.getAll('files') as File[];

  const uploadDir = path.join(process.cwd(), '/public/uploads');
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const uploadedFiles = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    uploadedFiles.push({
      name: file.name,
      path: `/uploads/${filename}`,
    });
  }

  const db = await dbConnect();
  await db.collection('uploads').insertOne({
    userId: user.id,
    files: uploadedFiles,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true, files: uploadedFiles });
};

   