# Restaurant LeadGen Demo

This demo runs entirely offline with mock data.

## Run locally

```bash
cd app
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

No API keys are required. Demo mode never makes network calls.

## UI actions

- **Run Demo**: loads a shuffled list of Strumica restaurants.
- **Export Excel**: downloads `Strumica_Restaurants_<date>.xlsx`.
- **Upload to Drive (Demo)**: shows "Uploading…" then "Uploaded ✓".
- **Approve**: toggle approval per business to enable WhatsApp send.
- **Send WhatsApp**: shows the personalized message preview and logs success.

![screenshot placeholder](screenshot.png)
