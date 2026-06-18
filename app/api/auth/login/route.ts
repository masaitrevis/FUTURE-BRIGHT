import { NextRequest, NextResponse } from "next/server";
import { pool, dbRowToDriver, isDbConnected } from "@/app/lib/server-db";
import bcrypt from "bcryptjs";

// In-memory fallback store
const drivers: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    if (pool && await isDbConnected()) {
      // Find driver in database
      const result = await pool.query(
        "SELECT * FROM drivers WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const driver = result.rows[0];
      const validPassword = await bcrypt.compare(password, driver.password_hash);

      if (!validPassword) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      // Create session token
      const token = `tk_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      await pool.query(
        "INSERT INTO sessions (driver_id, token, expires_at) VALUES ($1, $2, $3)",
        [driver.id, token, expiresAt]
      );

      const safeDriver = dbRowToDriver(driver);
      delete (safeDriver as any).passwordHash;

      return NextResponse.json({
        success: true,
        token,
        driver: safeDriver,
      });
    } else {
      // Fallback to in-memory
      const driver = drivers.find((d) => d.email === email);
      if (!driver) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      if (driver.password !== password) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      const token = `tk_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const { password: _, ...safeDriver } = driver;

      return NextResponse.json({
        success: true,
        token,
        driver: safeDriver,
      });
    }
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
