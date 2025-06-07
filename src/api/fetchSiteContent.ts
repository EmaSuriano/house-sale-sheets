import { fetchSheetData } from "./fetchSheetData";

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  whatsAppNumber: string;
  viewingInfo: string;
  location: string;
  siteTitle: string;
}

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "Quality Furniture & Home Items",
  heroSubtitle:
    "Moving sale featuring well-maintained furniture and household items. Everything must go!",
  whatsAppNumber: "",
  viewingInfo:
    "Items available for viewing by appointment. Weekends preferred, flexible scheduling available.",
  location: "[Your City], [State]",
  siteTitle: "House Sale",
};

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const data = await fetchSheetData("Content!A2:B20"); // Key-value pairs

    const content: Record<string, string> = {};
    data.forEach((row: string[]) => {
      if (row[0] && row[1]) {
        content[row[0]] = row[1];
      }
    });

    return { ...DEFAULT_CONTENT, ...content };
  } catch (error) {
    throw Error(`Error fetching site content: ${String(error)}`);
  }
}
