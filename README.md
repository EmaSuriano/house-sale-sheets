# House Sale Sheets

A project for managing and generating house sale documentation and sheets.

## Description

This project helps organize and create professional house sale sheets and related documentation for real estate transactions. It processes spreadsheet data containing item information and generates formatted sale sheets with images and details.

## Installation

```bash
# Clone the repository
git clone https://github.com/EmaSuriano/house-sale-sheets.git
cd house-sale-sheets

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following required fields:

```env
SHEETS_API_KEY=your_google_sheets_api_key_here
SPREADSHEET_ID=your_spreadsheet_id_here
```

These fields are required for the proper integration of Google Sheets API. For more information please refer to https://developers.google.com/workspace/sheets/api/guides/concepts

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

## Deployment

This project is deployed using GitHub Pages, which provides a simple and free hosting solution for static websites.

### Setting up GitHub Pages

1. Navigate to your repository settings on GitHub
2. Scroll down to the "Pages" section
3. Select "Deploy from a branch" as the source
4. Choose the branch you want to deploy from (typically `main` or `gh-pages`)
5. Click "Save"

### Environment Variables Configuration

Since GitHub Pages doesn't support server-side environment variables, you'll need to configure the required environment variables in your GitHub repository:

1. Go to your repository's **Settings** tab
2. Navigate to **Secrets and variables** → **Actions**
3. Add the following repository secrets:
   - `SHEETS_API_KEY`: Your Google Sheets API key
   - `SPREADSHEET_ID`: Your Google Spreadsheet ID

These secrets will be available during the build process and can be used to generate the static files with the necessary configuration.

### Automatic Deployment

Once configured, GitHub Pages will automatically rebuild and deploy your site whenever you push changes to the selected branch. The site will be available at `https://yourusername.github.io/house-sale-sheets/`.

## Automated Deployment with Apps Script

You can automate the deployment process to trigger whenever the spreadsheet is updated using Google Apps Script. This ensures your house sale sheets are always up-to-date with the latest changes.

### Setting up Apps Script

1. Open your Google Spreadsheet
2. Go to **Extensions** → **Apps Script**
3. Delete the default code and paste the following script:

```javascript
function onEdit(e) {
  // Optional: Add conditions to filter which changes should trigger the workflow
  // if (e.range.getSheet().getName() !== 'Sheet1') return;

  triggerGitHubWorkflow();
}

function triggerGitHubWorkflow() {
  const GITHUB_TOKEN =
    PropertiesService.getScriptProperties().getProperty("GITHUB_TOKEN");
  const OWNER = "EmaSuriano";
  const REPO = "house-sale-sheets";
  const WORKFLOW_ID = "ci.yml";

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`;

  const payload = {
    ref: "main", // branch to run workflow on
    inputs: {}, // optional inputs if your workflow accepts them
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    payload: JSON.stringify(payload),
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    console.log("Workflow triggered:", response.getResponseCode());
  } catch (error) {
    console.error("Error triggering workflow:", error);
  }
}
```

### Configuration Steps

1. **Create a GitHub Personal Access Token**:

   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` and `workflow` permissions
   - Copy the token for the next step

2. **Configure Apps Script Properties**:

   - In the Apps Script editor, go to **Project Settings** (gear icon)
   - Scroll down to **Script Properties**
   - Add a new property:
     - Property: `GITHUB_TOKEN`
     - Value: Your GitHub personal access token

3. **Save and Deploy**:
   - Save the script (`Ctrl+S` or `Cmd+S`)
   - The script will automatically trigger on any cell edit in the spreadsheet

### How It Works

- The `onEdit(e)` function is a built-in Google Apps Script trigger that runs whenever a cell is edited
- It calls `triggerGitHubWorkflow()` which sends a POST request to the GitHub Actions API
- This triggers your CI/CD workflow (`ci.yml`) to rebuild and deploy the site
- Your house sale sheets will be automatically updated within minutes of any spreadsheet changes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
