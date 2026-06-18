import { Pool, PoolClient } from "pg";

// Check for database URL
const connectionString = process.env.DATABASE_URL;

// Create pool if DATABASE_URL is available (Alwaysdata or any PostgreSQL)
export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false, // Required for many cloud providers including Alwaysdata
      },
    })
  : null;

// Check if database is connected
export async function isDbConnected(): Promise<boolean> {
  if (!pool) return false;
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    return true;
  } catch {
    return false;
  }
}

// Initialize tables (run once at startup or via setup script)
export async function initDb() {
  if (!pool) {
    console.log("No DATABASE_URL set — using localStorage fallback mode");
    return;
  }

  try {
    const client = await pool.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS drivers (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50) NOT NULL,
        national_id VARCHAR(100),
        date_of_birth DATE,
        location VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        license_number VARCHAR(100),
        license_category VARCHAR(10),
        license_expiry DATE,
        years_experience INTEGER DEFAULT 0,
        vehicle_types TEXT[],
        accident_history BOOLEAN DEFAULT FALSE,
        accident_details TEXT,
        has_defensive_driving BOOLEAN DEFAULT FALSE,
        has_first_aid BOOLEAN DEFAULT FALSE,
        languages TEXT[],
        employment_status VARCHAR(50),
        desired_training TEXT[],
        classification VARCHAR(50),
        recommended_trainings JSONB,
        next_steps TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        driver_id INTEGER REFERENCES drivers(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    client.release();
    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

// Helper: convert snake_case DB row to camelCase driver object
export function dbRowToDriver(row: any) {
  return {
    id: row.id?.toString(),
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    nationalId: row.national_id,
    dateOfBirth: row.date_of_birth,
    location: row.location,
    licenseNumber: row.license_number,
    licenseCategory: row.license_category,
    licenseExpiry: row.license_expiry,
    yearsExperience: row.years_experience,
    vehicleTypes: row.vehicle_types || [],
    accidentHistory: row.accident_history,
    accidentDetails: row.accident_details,
    hasDefensiveDriving: row.has_defensive_driving,
    hasFirstAid: row.has_first_aid,
    languages: row.languages || [],
    employmentStatus: row.employment_status,
    desiredTraining: row.desired_training || [],
    classification: row.classification,
    recommendedTrainings: row.recommended_trainings || [],
    nextSteps: row.next_steps || [],
    createdAt: row.created_at,
  };
}
