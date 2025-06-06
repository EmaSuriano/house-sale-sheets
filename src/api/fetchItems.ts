import { fetchSheetData } from "./fetchSheetData";

export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  condition: "excellent" | "good" | "fair";
  description: string;
  images: string[];
  dimensions?: string;
  sold?: boolean;
}

export async function fetchItems(): Promise<Item[]> {
  try {
    const data = await fetchSheetData("Items!A2:L1000"); // Skip header row

    return data.map((row: string[], index: number) => ({
      id: (index + 1).toString(),
      name: row[0] || "",
      price: parseFloat(row[1]) || 0,
      category: row[2] || "",
      condition: (row[3] as "excellent" | "good" | "fair") || "good",
      description: row[4] || "",
      dimensions: row[5] || undefined,
      sold: row[6]?.toLowerCase() === "true" || false,
      images: row.slice(7, 7 + 5),
    }));
  } catch (error) {
    console.error("Error fetching items:", error);
    // Return fallback data if API fails
    return [];
  }
}
