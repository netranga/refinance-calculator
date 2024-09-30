import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
      const result = await sql`
        SELECT id, name, interest_rate, home_value
        FROM HOMES;
      `;

      const properties = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        interestRate: parseFloat(row.interest_rate),
        homeValue: parseFloat(row.home_value)
      }));

      return NextResponse.json(properties);
    } catch (error: any) {
      console.error('Failed to fetch properties:', error);
      return NextResponse.json({
        message: 'Failed to fetch properties',
        error: error.message,
      }, { status: 500 });
    }
  }


