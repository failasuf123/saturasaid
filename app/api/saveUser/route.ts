import { NextResponse } from 'next/server';
import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { clerkid } = await req.json();

    if (!clerkid) {
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: {
        clerkid: clerkid,
      },
      update: {},
      create: {
        clerkid: clerkid,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
