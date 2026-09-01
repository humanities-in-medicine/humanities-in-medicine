# Custom domain setup (no personal name in URL)

Your site is currently at:

`https://noadobzinski.github.io/humanities-in-medicine/`

To remove your username, move the repo to a **GitHub Organization**. The new URL will be:

**https://humanities-in-medicine.github.io/**

## One-time setup (about 5 minutes)

### Step 1 — Create the organization

1. Go to **https://github.com/organizations/plan**
2. Choose **Create a free organization**
3. Organization name: `humanities-in-medicine`
4. Contact email: your club email
5. Complete the setup (you can skip adding members for now)

### Step 2 — Transfer the repository

1. Open **https://github.com/noadobzinski/humanities-in-medicine/settings**
2. Scroll to **Danger Zone** → **Transfer ownership**
3. New owner: `humanities-in-medicine`
4. Confirm the transfer

### Step 3 — Rename for a clean URL

1. Open **https://github.com/humanities-in-medicine/humanities-in-medicine/settings**
2. Under **Repository name**, change to: `humanities-in-medicine.github.io`
3. Click **Rename**

### Step 4 — Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: **GitHub Actions** (should already be configured)
3. Push any change to `main` if the site doesn't appear within a few minutes

### Step 5 — Update your local project remote

In Cursor, run:

```bash
cd ~/Projects/humanities-in-medicine
git remote set-url origin https://github.com/humanities-in-medicine/humanities-in-medicine.github.io.git
git pull
```

---

## After setup

| What | URL |
|------|-----|
| Live site | https://humanities-in-medicine.github.io/ |
| Edit content (browser) | https://humanities-in-medicine.github.io/edit.html |
| GitHub repo | https://github.com/humanities-in-medicine/humanities-in-medicine.github.io |

Editing still works the same way — update `content.json` and push to `main`.

## Optional: college custom domain

You can also add a domain like `humanitiesinmedicine.yourcollege.edu` in **Settings → Pages → Custom domain** on the org repo.
