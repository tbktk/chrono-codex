import { NextResponse } from 'next/server';
import { SQLiteTimeLogRepository } from '@/infrastructure/repositories/SQLiteTimeLogRepository';
import { CreateTimeLogCommand } from '@/domain/services/ITimeLogCommandService';

const timeLogRepository = new SQLiteTimeLogRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string }}
) {
  try {
    const timeLog = await timeLogRepository.findById(params.id);

    if (!timeLog) {
      return NextResponse.json({ error: 'Time log not found' }, { status: 404 });
    }
    
    return NextResponse.json(timeLog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch time log' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await request.json()) as Partial<CreateTimeLogCommand>;
    const updatedLog = await timeLogRepository.update(params.id, body);
    return NextResponse.json(updatedLog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update time log' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await timeLogRepository.delete(params.id);
    // 成功したが返すコンテンツがないことを示す204ステータス
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete time log' }, { status: 500 });
  }
}