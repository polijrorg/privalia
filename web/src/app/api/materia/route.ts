import { NextResponse } from 'next/server'
import prisma from '@/services/db'
import { getAllMaterias } from '@/services/api/materia'

export async function GET() {
  try {
    const ctx = { prisma }
    const materias = await getAllMaterias(ctx)

    return NextResponse.json(materias, { status: 200 })
  } catch (error) {
    console.error('Error fetching materias:', error)
    return NextResponse.json(
      { error: 'Failed to fetch materias' },
      { status: 500 }
    )
  }
}