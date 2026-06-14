import { NextRequest, NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";

// UPDATE product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDb();
    const body = await request.json();
    const { name, description, price, category, image_url, is_active } = body;

    const result = await query(
      `UPDATE products
       SET name = $1, description = $2, price = $3, category = $4, image_url = $5, is_active = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, description, price, category, image_url, is_active, params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE product (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDb();
    const result = await query(
      `UPDATE products SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
