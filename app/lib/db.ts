import { DriverProfile } from "./driver";

const STORAGE_KEY = "bright_elite_drivers";
const SESSION_KEY = "bright_elite_session";

// Client-side DB utility
// When Alwaysdata (PostgreSQL) is connected, all CRUD goes through API routes
// When offline or DB not configured, falls back to localStorage (dev/demo only)

export const db = {
  async createDriver(data: DriverProfile): Promise<DriverProfile> {
    // API call is made by the signup page component
    // This client DB is only used for offline fallback / caching
    const drivers = getDrivers();
    const existing = drivers.find((d) => d.email === data.email);
    if (existing) {
      throw new Error("A driver with this email already exists");
    }
    const driver: DriverProfile = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    drivers.push(driver);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drivers));
    return driver;
  },

  async getDriverByEmail(email: string): Promise<DriverProfile | null> {
    const drivers = getDrivers();
    return drivers.find((d) => d.email === email) || null;
  },

  async getDriverById(id: string): Promise<DriverProfile | null> {
    const drivers = getDrivers();
    return drivers.find((d) => d.id === id) || null;
  },

  async updateDriver(id: string, updates: Partial<DriverProfile>): Promise<DriverProfile | null> {
    const drivers = getDrivers();
    const idx = drivers.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    drivers[idx] = { ...drivers[idx], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drivers));
    return drivers[idx];
  },

  createSession(driver: DriverProfile): string {
    const token = generateToken();
    const session = {
      token,
      driverId: driver.id,
      email: driver.email,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return token;
  },

  getSession(): { token: string; driverId?: string; email?: string } | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      const session = JSON.parse(raw);
      if (session.expiresAt && session.expiresAt < Date.now()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentDriver(): DriverProfile | null {
    const session = this.getSession();
    if (!session?.driverId) return null;
    const drivers = getDrivers();
    return drivers.find((d) => d.id === session.driverId) || null;
  },
};

function getDrivers(): DriverProfile[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function generateToken(): string {
  return (
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  );
}

// Alwaysdata connection placeholder
// When you get your Alwaysdata credentials, replace the localStorage calls above
// The API routes in app/api/ now automatically use PostgreSQL when DATABASE_URL is set
export async function connectAlwaysData(connectionString: string) {
  // This is handled server-side by app/lib/server-db.ts
  console.log("Alwaysdata connection is configured server-side:", connectionString.substring(0, 20) + "...");
}
