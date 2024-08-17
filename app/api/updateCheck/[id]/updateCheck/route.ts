import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
  
    try {
      const { check } = await request.json();
  
      const updatedInvitation = await prisma.invitation.update({
        where: { inviteId: parseInt(id) },
        data: { check },
      });
  
      return NextResponse.json({ success: true, invitation: updatedInvitation });
    } catch (error) {
      console.error('Error updating check status:', error);
      return NextResponse.json({ success: false, error: 'Failed to update check status' }, { status: 500 });
    }
  }