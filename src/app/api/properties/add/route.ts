import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: Request) {
  try {
    console.log('Attempting to connect to database...');

    // Test connection
    const testResult = await sql`SELECT NOW();`;
    console.log('Connected successfully. Current time:', testResult.rows[0].now);

    // Check if columns exist before altering
    const checkColumns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'homes';
    `;
    console.log('Existing columns:', checkColumns.rows.map(row => row.column_name));

    // Add new columns if they don't exist
    console.log('Attempting to alter table...');
    await sql`
      ALTER TABLE HOMES
      ADD COLUMN IF NOT EXISTS monthly_principal_payment DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS hoa_fee DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS insurance_payment DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS property_tax DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    `;
    console.log('Table alter command executed');

    // Check columns again to confirm addition
    const checkColumnsAfter = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'homes';
    `;
    console.log('Columns after alteration:', checkColumnsAfter.rows.map(row => row.column_name));

    // Update values for 'tristan'
    console.log('Updating values for tristan...');
    await sql`
      UPDATE homes
      SET 
        hoa_fee = 181.00,
        insurance_payment = 179.00,
        property_tax = 179.00,
        monthly_principal_payment = 1511.00,
        last_updated_at = CURRENT_TIMESTAMP
      WHERE name = 'nethra';
    `;
    console.log('Values updated for tristan');

    // Fetch updated row to confirm changes
    const updatedRow = await sql`
      SELECT * FROM homes WHERE name = 'tristan';
    `;
    console.log('Updated row:', updatedRow.rows[0]);

    return NextResponse.json({
      message: 'Columns added and values updated successfully',
      updatedRow: updatedRow.rows[0]
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      message: 'Failed to add columns or update values',
      error: error.message,
    }, { status: 500 });
  }
}