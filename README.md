# QC Workspace Prototype

A minimal frontend-only prototype for a Quality Control (QC) workspace feature built with React and JavaScript using Vite.

## Setup

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Implemented Flows

### 1. QC Inbox Page (`/qc`)

View a list of documents that need attention with filtering capabilities:

- **Status Filter**: Filter by document status (All, Failed, Needs Review, Resolved, Clean). Defaults to "Failed".
- **Tenant Filter**: Filter by tenant ID. Shows all unique tenants from the data plus an "All tenants" option.
- **Search**: Search documents by Document ID.

The table displays:
- Document ID
- Tenant
- Type
- Status (with color-coded badges)
- Error Summary
- Created At (formatted date)

Clicking on any table row navigates to the Document Detail page for that document.

### 2. Document Detail Page (`/qc/documents/:id`)

View detailed information about a specific document and perform QC actions:

**Left Side - Document Information:**
- Document ID
- Tenant
- Type
- Status (badge)
- Created At (formatted date/time)
- Pipeline ID
- Document Preview placeholder

**Right Side - QC Panel:**
- Error Details section showing error summary and error types as chips
- Actions section with two buttons:
  - **Retry**: Triggers a retry for failed or needs_review documents. Shows a toast message "Retry triggered (mocked)". Sets status to "needs_review".
  - **Mark resolved**: Marks the document as resolved. Shows a toast message "Document marked as resolved".

The page includes a "Back to QC Inbox" button at the top to return to the inbox.

### 3. State Management

All document state is managed in memory using React Context. Changes persist during the session but reset on page refresh (as expected for a frontend-only prototype).

## Project Structure

```
src/
├── data/
│   └── sampleDocuments.js       # Sample document data (6-10 documents)
├── context/
│   └── QcDocumentsContext.jsx   # React Context for document state
├── components/
│   ├── TopBar.jsx               # Top navigation bar
│   ├── TopBar.css
│   ├── QcInboxPage.jsx          # QC Inbox list page
│   ├── QcInboxPage.css
│   ├── DocumentDetailPage.jsx   # Document detail page
│   └── DocumentDetailPage.css
├── App.jsx                       # Main app component with routing
├── App.css                       # Global styles
└── main.jsx                      # Entry point
```

## Notes

- All actions are mocked (UI-only) - no real API calls are made
- State changes are in-memory only and reset on page refresh
- The prototype demonstrates the user flow for a QC workspace feature
