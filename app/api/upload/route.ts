// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import File from '@/models/File';

export async function POST(req: Request) {
  await dbConnect();

  const formData = await req.formData();
  const files = formData.getAll('files') as File[];

  const uploadedBy = formData.get('uploadedBy') || 'unknown';

  const fileRecords = files.map(file => ({
    name: file.name,
    size: file.size,
    uploadedBy,
  }));

  await File.insertMany(fileRecords);

  return NextResponse.json({ success: true, files: fileRecords });
}
