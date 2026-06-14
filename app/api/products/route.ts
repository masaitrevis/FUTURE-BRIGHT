import { NextRequest, NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";

// GET all products
export async function GET() {
  try {
    await initDb();
    const result = await query(
      "SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC"
    );
    return NextResponse.json({ success: true, products: result.rows });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// CREATE new product
export async function POST(request: NextRequest) {
  try {
    await initDb();
    const body = await request.json();
    const { name, description, price, category, image_url } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Product name is required" },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO products (name, description, price, category, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description || null, price || null, category || null, image_url || null]
    );

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
