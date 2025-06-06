import { fetchSheetData } from "./fetchSheetData";

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  viewingInfo: string;
  location: string;
  siteTitle: string;
}

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const data = await fetchSheetData("Content!A2:B20"); // Key-value pairs

    const content: Record<string, string> = {};
    data.forEach((row: string[]) => {
      if (row[0] && row[1]) {
        content[row[0]] = row[1];
      }
    });

    return {
      heroTitle: content["heroTitle"] || "Quality Furniture & Home Items",
      heroSubtitle:
        content["heroSubtitle"] ||
        "Moving sale featuring well-maintained furniture and household items. Everything must go!",
      contactEmail: content["contactEmail"] || "housesale2024@email.com",
      contactPhone: content["contactPhone"] || "(555) 123-4567",
      viewingInfo:
        content["viewingInfo"] ||
        "Items available for viewing by appointment. Weekends preferred, flexible scheduling available.",
      location: content["location"] || "[Your City], [State]",
      siteTitle: content["siteTitle"] || "House Sale",
    };
  } catch (error) {
    console.error("Error fetching site content:", error);
    // Return fallback content if API fails
    return {
      heroTitle: "Quality Furniture & Home Items",
      heroSubtitle:
        "Moving sale featuring well-maintained furniture and household items. Everything must go!",
      contactEmail: "housesale2024@email.com",
      contactPhone: "(555) 123-4567",
      viewingInfo:
        "Items available for viewing by appointment. Weekends preferred, flexible scheduling available.",
      location: "[Your City], [State]",
      siteTitle: "Ema Sale",
    };
  }
}
