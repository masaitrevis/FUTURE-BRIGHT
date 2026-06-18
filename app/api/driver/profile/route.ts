import { NextRequest, NextResponse } from "next/server";
import { pool, dbRowToDriver, isDbConnected } from "@/app/lib/server-db";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    if (pool && await isDbConnected()) {
      // Validate session token
      const sessionResult = await pool.query(
        `SELECT s.driver_id, s.expires_at
         FROM sessions s
         WHERE s.token = $1 AND s.expires_at > NOW()`,
        [token]
      );

      if (sessionResult.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid or expired session" },
          { status: 401 }
        );
      }

      const driverId = sessionResult.rows[0].driver_id;

      // Fetch driver profile
      const driverResult = await pool.query(
        "SELECT * FROM drivers WHERE id = $1",
        [driverId]
      );

      if (driverResult.rows.length === 0) {
        return NextResponse.json(
          { error: "Driver not found" },
          { status: 404 }
        );
      }

      const driver = dbRowToDriver(driverResult.rows[0]);
      delete (driver as any).passwordHash;

      return NextResponse.json({ success: true, driver });
    } else {
      // Fallback: check localStorage hint
      return NextResponse.json({
        message: "Database not connected. Using client-side storage.",
      });
    }
  } catch (error: any) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (pool && await isDbConnected()) {
      // Validate session
      const sessionResult = await pool.query(
        "SELECT driver_id FROM sessions WHERE token = $1 AND expires_at > NOW()",
        [token]
      );

      if (sessionResult.rows.length === 0) {
        return NextResponse.json(
          { error: "Invalid or expired session" },
          { status: 401 }
        );
      }

      const driverId = sessionResult.rows[0].driver_id;

      // Build update query dynamically
      const allowedFields = [
        "full_name", "phone", "national_id", "location",
        "license_number", "license_category", "license_expiry",
        "years_experience", "vehicle_types", "has_defensive_driving",
        "has_first_aid", "languages", "employment_status", "desired_training",
      ];

      const updates: string[] = [];
      const values: any[] = [];
      let paramIdx = 1;

      for (const [key, value] of Object.entries(body)) {
        const dbField = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        if (allowedFields.includes(dbField)) {
          updates.push(`${dbField} = $${paramIdx}`);
          values.push(value);
          paramIdx++;
        }
      }

      if (updates.length === 0) {
        return NextResponse.json(
          { error: "No valid fields to update" },
          { status: 400 }
        );
      }

      values.push(driverId);
      await pool.query(
        `UPDATE drivers SET ${updates.join(", ")}, updated_at = NOW() WHERE id = $${paramIdx}`,
        values
      );

      // Fetch updated driver
      const driverResult = await pool.query(
        "SELECT * FROM drivers WHERE id = $1",
        [driverId]
      );

      const driver = dbRowToDriver(driverResult.rows[0]);
      delete (driver as any).passwordHash;

      return NextResponse.json({ success: true, driver });
    } else {
      return NextResponse.json({
        success: true,
        message: "Profile update saved to client storage.",
      });
    }
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: error.message || "Update failed" },
      { status: 500 }
    );
  }
}
