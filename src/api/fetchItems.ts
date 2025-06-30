import { z } from 'astro/zod';
import { fetchSheetData } from './fetchSheetData';

const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.string(),
  condition: z.enum(['Excellent', 'Good', 'Fair']),
  description: z.string(),
  newProductUrl: z.string().url().optional(),
  sold: z.boolean(),
  images: z
    .array(z.string().url())
    .nonempty()
    .transform((images) => images.slice(0, 5)),
});

type Item = z.infer<typeof ItemSchema>;

export async function fetchItems(): Promise<Item[]> {
  try {
    const data = await fetchSheetData('Items!A2:L1000'); // Skip header row

    return data
      .map((row: string[], index: number) => {
        const [
          name,
          price,
          category,
          condition,
          description,
          newProductUrl,
          sold,
          ...images
        ] = row;

        const result = ItemSchema.safeParse({
          id: (index + 1).toString(),
          name,
          price,
          category,
          condition,
          description,
          newProductUrl: newProductUrl || undefined,
          sold: sold === 'TRUE',
          images,
        });

        return result.success ? result.data : null;
      })
      .filter((item): item is Item => item !== null);
  } catch (error) {
    throw Error(`Error fetching items: ${String(error)}`);
  }
}
