import { fetchSheetData } from "./fetchSheetData";

export interface Item {
  id: string;
  name: string;
  price: string;
  category: string;
  condition: "excellent" | "good" | "fair";
  description: string;
  newProductUrl: string;
  sold: boolean;
  images: string[];
}

export async function fetchItems(): Promise<Item[]> {
  try {
    const data = await fetchSheetData("Items!A2:L1000"); // Skip header row

    return data
      .map((row: string[], index: number) => ({
        id: (index + 1).toString(),
        name: row[0] || "",
        price: row[1] || "",
        category: row[2] || "",
        condition: (row[3] || "") as Item["condition"],
        description: row[4] || "",
        newProductUrl: row[5] || "",
        sold: row[6] === "TRUE",
        images: row.slice(7, 7 + 5),
      }))
      .filter((item) => item.name);
  } catch (error) {
    throw Error(`Error fetching items: ${String(error)}`);
  }
}
