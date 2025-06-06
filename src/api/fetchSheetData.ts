// Function to fetch data from Google Sheets
export async function fetchSheetData(range: string): Promise<string[][]> {
  const { SHEETS_API_KEY, SPREADSHEET_ID } = import.meta.env;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.values || [];
  } catch (error) {
    throw Error(`Error fetching sheet data: ${String(error)}`);
  }
}
