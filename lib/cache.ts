import fs from "fs";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), "cache");
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

interface CacheData<T> {
  data: T;
  timestamp: number;
}

function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function getCachePath(key: string): string {
  return path.join(CACHE_DIR, `${key}.json`);
}

export function getCache<T>(key: string): T | null {
  try {
    const cachePath = getCachePath(key);

    if (!fs.existsSync(cachePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(cachePath, "utf-8");
    const cacheData: CacheData<T> = JSON.parse(fileContent);

    // Check if cache has expired
    const now = Date.now();
    if (now - cacheData.timestamp > CACHE_TTL) {
      // Cache expired, delete the file
      fs.unlinkSync(cachePath);
      return null;
    }

    return cacheData.data;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T): void {
  try {
    ensureCacheDir();
    const cachePath = getCachePath(key);
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };
    fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error("Failed to write cache:", error);
  }
}

export function clearCache(): { success: boolean; clearedFiles: string[] } {
  const clearedFiles: string[] = [];

  try {
    if (!fs.existsSync(CACHE_DIR)) {
      return { success: true, clearedFiles };
    }

    const files = fs.readdirSync(CACHE_DIR);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(CACHE_DIR, file);
        fs.unlinkSync(filePath);
        clearedFiles.push(file);
      }
    }

    return { success: true, clearedFiles };
  } catch (error) {
    console.error("Failed to clear cache:", error);
    return { success: false, clearedFiles };
  }
}

export function getCacheInfo(): {
  exists: boolean;
  files: { name: string; age: number; expired: boolean }[];
} {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      return { exists: false, files: [] };
    }

    const files = fs.readdirSync(CACHE_DIR);
    const now = Date.now();

    const fileInfo = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const filePath = path.join(CACHE_DIR, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const cacheData: CacheData<unknown> = JSON.parse(content);
        const age = now - cacheData.timestamp;

        return {
          name: file,
          age,
          expired: age > CACHE_TTL,
        };
      });

    return { exists: true, files: fileInfo };
  } catch {
    return { exists: false, files: [] };
  }
}
