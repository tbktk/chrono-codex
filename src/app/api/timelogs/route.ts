import { NextResponse } from 'next/server';
import { SQLiteTimeLogRepository } from '@/infrastructure/repositories/SQLiteTimeLogRepository';
import { CreateTimeLogCommand } from '@/domain/services/ITimeLogCommandService';

const timeLogRepository = new SQLiteTimeLogRepository();

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateTimeLogCommand;

    // サービス層を介するのが理想だが、まずは直接リポジトリを呼び出す
    const newTimeLog = await timeLogRepository.create({
      description: body.description,
      startTime: body.startTime,
      endTime: body.endTime,
    });

    return NextResponse.json(newTimeLog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create time log' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const timeLogs = await timeLogRepository.findAll();
    return NextResponse.json(timeLogs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch time logs' }, { status: 500 });
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