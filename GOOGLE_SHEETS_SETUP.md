# Google Sheets Email Collection Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Lumio Cat Email Subscribers"
4. In Row 1, add these headers:
   - A1: `Timestamp`
   - B1: `Email`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Append the email with timestamp
    sheet.appendRow([
      new Date().toISOString(),
      data.email
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Email collection endpoint is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (Ctrl+S)
4. Name the project "Lumio Email Collector"

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure:
   - Description: "Email collector"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** and allow permissions
6. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 4: Update Website

Open `js/main.js` and find the `GOOGLE_SCRIPT_URL` variable.
Replace the placeholder with your actual Web app URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## Testing

1. Open your website
2. Enter a test email and submit
3. Check your Google Sheet - the email should appear!

## Troubleshooting

- **CORS errors**: Make sure "Who has access" is set to "Anyone"
- **No data appearing**: Check the Apps Script execution log (View > Executions)
- **Permission denied**: Re-deploy and re-authorize

## Security Note

The Web app URL is public. This is fine for email collection but don't use it for sensitive data.
