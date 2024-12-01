import { NextResponse } from 'next/server'
import dashboardData from '../dashboard-data.json'

export async function GET() {
  return NextResponse.json(dashboardData)
}

