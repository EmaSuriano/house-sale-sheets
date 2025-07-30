import { fetchSheetData } from './fetchSheetData';
import { z } from 'astro/zod';

const SiteContentSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  whatsAppNumber: z.string(),
  siteTitle: z.string(),
});

type SiteContent = z.infer<typeof SiteContentSchema>;

export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    const data = await fetchSheetData('Content!A2:B20'); // Key-value pairs

    const content: Record<string, string> = {};
    data.forEach((row: string[]) => {
      const [key, value] = row;
      content[key] = value;
    });

    return SiteContentSchema.parse(content);
  } catch (error) {
    throw Error(`Error fetching site content: ${String(error)}`);
  }
}
