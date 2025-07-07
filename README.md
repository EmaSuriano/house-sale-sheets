# House Sale Sheets

A project for managing and generating house sale documentation and sheets.

## Description

This project helps organize and create professional house sale sheets and related documentation for real estate transactions. It processes spreadsheet data containing item information and generates formatted sale sheets with images and details.

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd house-sale-sheets

# Install dependencies (if applicable)
npm install
```

## Usage

```bash
# Add usage instructions here
npm start
```

## Features

- Generate professional house sale sheets from spreadsheet data
- Support for multiple item categories (Bathroom, Bedroom, Kitchen, Living Room, etc.)
- Include item images with cover photo selection
- Track item condition and pricing
- Link to original product URLs for reference
- Export to various formats (PDF, HTML, etc.)
- Mark items as sold/available
- Support for multiple images per item
- Organize items by room/category

## Spreadsheet Structure

The project processes spreadsheet data to generate house sale sheets. Below is an example of the required structure:

| Name          | Price | Category | Condition | New URL                       | Sold  | Cover                               | Images                          | Images                          | Images | Images |
| ------------- | ----- | -------- | --------- | ----------------------------- | ----- | ----------------------------------- | ------------------------------- | ------------------------------- | ------ | ------ |
| Kitchen Table | €120  | Kitchen  | Good      | https://www.example.com/table | FALSE | https://example.com/table-cover.jpg | https://example.com/table-1.jpg | https://example.com/table-2.jpg |        |        |
| Office Chair  | €80   | Office   | Excellent | https://www.example.com/chair | FALSE | https://example.com/chair-cover.jpg | https://example.com/chair-1.jpg |                                 |        |        |

### Column Descriptions:

- **Name**: Item name or description (e.g., "Washing machine + shelf")
- **Price**: Item selling price (e.g., "€150")
- **Category**: Room or category classification (e.g., "Bathroom", "Bedroom", "Kitchen", "Living Room")
- **Condition**: Item condition rating (e.g., "Excellent", "Good", "Fair")
- **New URL**: Link to original product page for reference
- **Sold**: Sale status - "FALSE" for available items, "TRUE" for sold items
- **Cover**: URL of the main display image for the item
- **Images**: Additional image URLs (multiple columns supported for extra photos)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
