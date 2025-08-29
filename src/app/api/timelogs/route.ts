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
    return NextResponse.json({ error: 'Failed to create time log' }, { status: 500 });
  }
}