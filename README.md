# Humanities in Medicine — Club Website

Live static website for the Humanities in Medicine college club.

## Live site

After deployment, the site is published via **GitHub Pages**. The URL will be:

`https://<your-github-username>.github.io/humanities-in-medicine/`

## Edit the site (easy way)

**All content is in one file: `content.json`**

Edit officers, events, journal issues, email, Instagram, and homepage text without touching HTML.

### Option 1 — Edit in Cursor (recommended)

1. Open `content.json` in this project
2. Change text, add events, update officer names, etc.
3. Commit and push — the live site updates automatically

### Option 2 — Use the web editor

Visit **`/edit.html`** on your live site (e.g. `https://yoursite.github.io/humanities-in-medicine/edit.html`):

1. Edit the JSON in the browser
2. Click **Validate**, then **Download content.json**
3. Replace `content.json` in this project folder
4. Push to GitHub

### Images

Replace files in the `images/` folder, then update paths in `content.json` if filenames change.

## Local preview

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Project structure

| File | Purpose |
|------|---------|
| `content.json` | **All editable content** |
| `edit.html` | Browser-based content editor |
| `content.js` | Loads content into pages |
| `index.html`, `events.html`, etc. | Page layouts |
| `styles.css` | Styling |
| `images/` | Photos |

## Deploy / update live site

Push to the `main` branch on GitHub. GitHub Actions publishes automatically.

```bash
git add content.json
git commit -m "Update club content"
git push
```
