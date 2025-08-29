import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: このデータをサービス層に渡してデータベースに保存する
    console.log('Received time log:', body);

    // 一旦、成功したことにして受け取ったデータをそのまま返す
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create time log' }, { status: 500 });
  }
}