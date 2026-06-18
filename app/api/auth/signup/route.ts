import { NextRequest, NextResponse } from "next/server";
import { pool, dbRowToDriver, isDbConnected } from "@/app/lib/server-db";
import { classifyDriver } from "@/app/lib/driver";
import bcrypt from "bcryptjs";

// In-memory fallback store (only used when DATABASE_URL is not set)
const drivers: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      nationalId,
      dateOfBirth,
      location,
      password,
      licenseNumber,
      licenseCategory,
      licenseExpiry,
      yearsExperience,
      vehicleTypes,
      accidentHistory,
      accidentDetails,
      hasDefensiveDriving,
      hasFirstAid,
      languages,
      employmentStatus,
      desiredTraining,
    } = body;

    // Validation
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Classify driver
    const { classification, recommendedTrainings, nextSteps } = classifyDriver({
      yearsExperience: parseFloat(yearsExperience) || 0,
      hasDefensiveDriving: !!hasDefensiveDriving,
      hasFirstAid: !!hasFirstAid,
      licenseCategory,
      accidentHistory: !!accidentHistory,
      vehicleTypes: vehicleTypes || [],
    });

    const passwordHash = await bcrypt.hash(password, 10);

    // Check if database is connected
    if (pool && await isDbConnected()) {
      // Check for duplicate email
      const existing = await pool.query(
        "SELECT id FROM drivers WHERE email = $1",
        [email]
      );
      if (existing.rows.length > 0) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }

      // Insert driver into database
      const result = await pool.query(
        `INSERT INTO drivers (
          full_name, email, phone, national_id, date_of_birth, location,
          password_hash, license_number, license_category, license_expiry,
          years_experience, vehicle_types, accident_history, accident_details,
          has_defensive_driving, has_first_aid, languages, employment_status,
          desired_training, classification, recommended_trainings, next_steps
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        RETURNING *`,
        [
          fullName,
          email,
          phone,
          nationalId || null,
          dateOfBirth || null,
          location || null,
          passwordHash,
          licenseNumber || null,
          licenseCategory || "B",
          licenseExpiry || null,
          parseFloat(yearsExperience) || 0,
          vehicleTypes || [],
          !!accidentHistory,
          accidentDetails || null,
          !!hasDefensiveDriving,
          !!hasFirstAid,
          languages || [],
          employmentStatus || "unemployed",
          desiredTraining || [],
          classification,
          JSON.stringify(recommendedTrainings),
          nextSteps || [],
        ]
      );

      const driver = dbRowToDriver(result.rows[0]);
      const { passwordHash: _, ...safeDriver } = driver as any;

      return NextResponse.json(
        {
          success: true,
          driver: safeDriver,
          message: `Registration successful! You are classified as: ${classification}`,
        },
        { status: 201 }
      );
    } else {
      // Fallback to in-memory
      const existing = drivers.find((d) => d.email === email);
      if (existing) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }

      const driver = {
        id: `drv_${Date.now()}`,
        fullName,
        email,
        phone,
        nationalId,
        dateOfBirth,
        location,
        password,
        licenseNumber,
        licenseCategory,
        licenseExpiry,
        yearsExperience: parseFloat(yearsExperience) || 0,
        vehicleTypes: vehicleTypes || [],
        accidentHistory: !!accidentHistory,
        accidentDetails,
        hasDefensiveDriving: !!hasDefensiveDriving,
        hasFirstAid: !!hasFirstAid,
        languages: languages || [],
        employmentStatus,
        desiredTraining: desiredTraining || [],
        classification,
        recommendedTrainings,
        nextSteps,
        createdAt: new Date().toISOString(),
      };

      drivers.push(driver);
      const { password: _, ...safeDriver } = driver;

      return NextResponse.json(
        {
          success: true,
          driver: safeDriver,
          message: `Registration successful! You are classified as: ${classification}`,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
