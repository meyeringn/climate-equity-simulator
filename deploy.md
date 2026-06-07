# 🚀 Deployment Guide — Climate Equity Policy Simulator

This guide walks you through deploying your own instance of the Climate Equity Policy Simulator from scratch. Total time: **~40 minutes**.

You’ll deploy two things:

- **The proxy server** → Render (hides your API key)
- **The frontend** → GitHub Pages (free, public URL)

-----

## Prerequisites

Before you start, make sure you have:

- [ ] A [GitHub account](https://github.com) with this repo forked
- [ ] A [Render account](https://render.com) (free tier — sign up with GitHub)
- [ ] An [Anthropic API key](https://console.anthropic.com) (`sk-ant-...`)
- [ ] Node.js 18+ installed locally (only needed if running locally)

-----

## Part 1: Deploy the Proxy Server to Render

*~15 minutes*

The proxy server lives between your frontend and the Anthropic API. It keeps your API key secret so you never expose it in client-side code.

### Step 1 — Fork and push the repo

If you haven’t already, fork this repo to your GitHub account. Make sure `server.js` and `package.json` are present in the root of your fork.

### Step 2 — Create a new Web Service on Render

1. Go to [render.com](https://render.com) and log in
1. Click **New +** → **Web Service**
1. Click **Connect a repository** and select your forked repo
1. Render will auto-detect it as a Node.js app

### Step 3 — Configure the service

Fill in the following fields:

|Field            |Value                                            |
|-----------------|-------------------------------------------------|
|**Name**         |`climate-equity-simulator` (or anything you like)|
|**Region**       |US East (Ohio) — or closest to you               |
|**Branch**       |`main`                                           |
|**Runtime**      |Node                                             |
|**Build Command**|`npm install`                                    |
|**Start Command**|`npm start`                                      |
|**Instance Type**|Free                                             |

### Step 4 — Add your API key as an Environment Variable

This is the critical step. **Never paste your API key into code.**

1. Scroll down to **Environment Variables**
1. Click **Add Environment Variable**
1. Set:
- **Key:** `ANTHROPIC_API_KEY`
- **Value:** your `sk-ant-...` key
1. Click **Save**

### Step 5 — Deploy

Click **Create Web Service**. Render will build and deploy your server.

When it’s done, you’ll see a live URL like:

```
https://climate-equity-simulator.onrender.com
```

✅ **Test it:** Visit that URL in your browser. You should see:

```json
{ "status": "Climate Equity Policy Simulator proxy is running." }
```

> **⚠️ Free tier note:** Render’s free tier spins down after 15 minutes of inactivity. The first request after a cold start may take 30–60 seconds. This is normal. Paid tiers ($7/mo) stay warm.

-----

## Part 2: Update the Frontend to Point at Your Proxy

*~5 minutes*

Your `index.html` needs to know where your proxy server lives.

### Step 6 — Find the fetch URL in index.html

Open `index.html` and find this line (near the bottom, in the JavaScript section):

```javascript
const response = await fetch('YOUR_RENDER_URL/analyze', {
```

### Step 7 — Replace with your Render URL

Swap in your actual Render URL:

```javascript
const response = await fetch('https://climate-equity-simulator.onrender.com/analyze', {
```

Save the file and commit the change to your repo:

```bash
git add index.html
git commit -m "Update proxy URL to Render deployment"
git push
```

-----

## Part 3: Deploy the Frontend to GitHub Pages

*~10 minutes*

### Step 8 — Enable GitHub Pages

1. Go to your repo on GitHub
1. Click **Settings** → **Pages** (left sidebar)
1. Under **Source**, select:
- Branch: `main`
- Folder: `/ (root)`
1. Click **Save**

GitHub will build and deploy your site. It takes 1–3 minutes.

### Step 9 — Find your live URL

GitHub Pages will show you your URL at the top of the Pages settings:

```
https://YOUR-USERNAME.github.io/climate-equity-simulator
```

✅ **Test it:** Open the URL, paste in a policy proposal, and hit **Analyze**. You should see scores and an Equity Brief appear within a few seconds.

-----

## Part 4: Test End-to-End

*~5 minutes*

Use this sample policy text to verify everything is working:

> *“The City will plant 10,000 trees in neighborhoods with less than 15% canopy cover over the next three years, prioritizing Census tracts with above-average heat vulnerability scores. Tree selection will prioritize native species. Implementation will be managed by the Parks Department.”*

**Expected result:** A score in the Developing or Emerging range, with flags for missing disability access provisions, limited community benefit language, and no transit equity component.

If analysis returns, you’re live. 🎉

-----

## Running Locally (Optional)

If you want to test changes before deploying:

```bash
# Install dependencies
npm install

# Set your API key in your terminal session
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Start the proxy server
npm start
# → Proxy server running on port 3000

# In a second terminal, serve index.html
# Option A: Python (most machines have this)
python3 -m http.server 8080

# Option B: Node
npx serve .
```

Then open `http://localhost:8080` in your browser.

> Make sure the fetch URL in `index.html` points to `http://localhost:3000/analyze` when running locally. Switch it back before pushing to GitHub.

-----

## Troubleshooting

### “Failed to fetch” or network error in browser

- Check that your Render service is running (visit the Render dashboard)
- Confirm the fetch URL in `index.html` exactly matches your Render URL (no trailing slash)
- Check browser console (F12) for the specific error

### Render returns 500 error

- Go to Render dashboard → your service → **Logs**
- Most common cause: `ANTHROPIC_API_KEY` environment variable not set or has a typo
- Re-add the key under Environment Variables and redeploy

### GitHub Pages shows old version

- GitHub Pages can take 2–5 minutes to rebuild after a push
- Hard refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Check the Actions tab in your repo — look for a green checkmark on the latest Pages build

### Cold start delay (30–60 seconds on first use)

- This is expected on Render’s free tier
- The tool will work fine after the initial warm-up
- Consider upgrading to Render’s Starter plan ($7/mo) if you’re sharing the tool widely

### CORS error in browser console

- The `server.js` already includes CORS middleware
- If you’re still seeing errors, confirm your Render service redeployed after your last push

-----

## Customizing for Your City

Want to adapt this tool for a different city? The main thing to change is the system prompt in `server.js`:

```javascript
system: `You are an expert in climate equity policy analysis...
[Replace Philadelphia-specific context with your city's data]
- Your transit agency and equity issues
- Local heat vulnerability patterns  
- Environmental justice communities
- Relevant local datasets and programs`
```

Open an [Issue](../../issues) or PR if you build a city-specific variant — I’d love to link to it.

-----

## Deployment Checklist

- [ ] Repo forked with `server.js` and `package.json` present
- [ ] Render Web Service created and deployed
- [ ] `ANTHROPIC_API_KEY` set as environment variable in Render
- [ ] Render health check returns `{"status": "...proxy is running."}`
- [ ] `index.html` fetch URL updated to Render URL
- [ ] Changes committed and pushed to GitHub
- [ ] GitHub Pages enabled on main branch
- [ ] End-to-end test completed with sample policy text
- [ ] 🎉 Share your live URL

-----

*Questions? Open an [Issue](../../issues) or find me at [github.com/meyeringn](https://github.com/meyeringn).*