import { google } from "googleapis";

export interface Profile {
  name: string;
  title: string;
  bio: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  order: number;
}

export interface PortfolioProject {
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  order: number;
}

function formatPrivateKey(key: string): string {
  // Remove any surrounding quotes
  key = key.replace(/^["']|["']$/g, "");

  // Replace literal \n with actual newlines
  key = key.replace(/\\n/g, "\n");

  // If key has no newlines (all on one line), format it properly
  if (!key.includes("\n") || key.split("\n").length < 3) {
    // Extract the base64 content between the markers
    const beginMarker = "-----BEGIN PRIVATE KEY-----";
    const endMarker = "-----END PRIVATE KEY-----";

    const beginIndex = key.indexOf(beginMarker);
    const endIndex = key.indexOf(endMarker);

    if (beginIndex !== -1 && endIndex !== -1) {
      const base64Content = key
        .substring(beginIndex + beginMarker.length, endIndex)
        .replace(/\s/g, ""); // Remove any whitespace

      // Split base64 into 64-character lines (PEM standard)
      const lines: string[] = [];
      for (let i = 0; i < base64Content.length; i += 64) {
        lines.push(base64Content.substring(i, i + 64));
      }

      key = `${beginMarker}\n${lines.join("\n")}\n${endMarker}`;
    }
  }

  return key;
}

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error("Missing Google service account credentials");
  }

  const privateKey = formatPrivateKey(rawKey);

  // Ensure the key has proper PEM format
  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error("Invalid private key format - missing BEGIN marker");
  }

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function getSheetData(sheetName: string): Promise<string[][]> {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!A:Z`,
  });

  return response.data.values || [];
}

export async function fetchSocialLinks(): Promise<SocialLink[]> {
  const rows = await getSheetData("socials");

  if (rows.length < 2) {
    return [];
  }

  // Skip header row
  const dataRows = rows.slice(1);

  return dataRows
    .map((row) => ({
      platform: row[0] || "",
      url: row[1] || "",
      icon: row[2] || "",
      order: parseInt(row[3] || "0", 10),
    }))
    .filter((link) => link.platform && link.url)
    .sort((a, b) => a.order - b.order);
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  const rows = await getSheetData("portfolio");

  if (rows.length < 2) {
    return [];
  }

  // Skip header row
  const dataRows = rows.slice(1);

  return dataRows
    .map((row) => ({
      title: row[0] || "",
      description: row[1] || "",
      url: row[2] || "",
      image: row[3] || "",
      tags: (row[4] || "").split(",").map((tag: string) => tag.trim()).filter(Boolean),
      order: parseInt(row[5] || "0", 10),
    }))
    .filter((project) => project.title)
    .sort((a, b) => a.order - b.order);
}

export async function fetchProfile(): Promise<Profile> {
  const rows = await getSheetData("profile");

  // Profile sheet structure (key-value pairs):
  // | key   | value                    |
  // | name  | Your Name                |
  // | title | Developer & Designer     |
  // | bio   | Building beautiful...    |

  const defaultProfile: Profile = {
    name: "Your Name",
    title: "Developer & Designer",
    bio: "Building beautiful digital experiences",
  };

  if (rows.length < 2) {
    return defaultProfile;
  }

  // Skip header row and convert to key-value map
  const dataRows = rows.slice(1);
  const profileMap: Record<string, string> = {};

  for (const row of dataRows) {
    const key = (row[0] || "").toLowerCase().trim();
    const value = row[1] || "";
    if (key && value) {
      profileMap[key] = value;
    }
  }

  return {
    name: profileMap["name"] || defaultProfile.name,
    title: profileMap["title"] || defaultProfile.title,
    bio: profileMap["bio"] || defaultProfile.bio,
  };
}
