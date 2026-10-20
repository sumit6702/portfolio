import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'supabase', 'schema.sql');
    if (fs.existsSync(filePath)) {
      const sql = fs.readFileSync(filePath, 'utf-8');
      return new NextResponse(sql, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="supabase-schema.sql"',
        },
      });
    }
    return NextResponse.json({ error: 'Schema file not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
