# 🌍 Climate Equity Policy Simulator

**An AI-powered civic tech tool that scores climate policy proposals across five equity dimensions — and generates a structured Equity Brief in seconds.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Tool-2d6a4f?style=for-the-badge)](https://meyeringn.github.io/climate-equity-simulator)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-22577a?style=for-the-badge&logo=github)](https://meyeringn.github.io/climate-equity-simulator)
[![License: MIT](https://img.shields.io/badge/License-MIT-f4a261?style=for-the-badge)](LICENSE)
[![Built with Claude](https://img.shields.io/badge/Powered_by-Claude_AI-8ecae6?style=for-the-badge)](https://anthropic.com)

-----

## What It Does

Most climate policy gets written without a structured equity review. Decision-makers are busy. Advocates are stretched thin. And the communities most harmed by climate change — low-income neighborhoods, communities of color, Disabled people, renters — are the ones least likely to have their needs baked in from the start.

The **Climate Equity Policy Simulator** changes that.

Paste in any climate policy proposal — a city ordinance, a federal rule summary, a budget line item, a proposed program — and the tool uses AI to score it across **five equity dimensions**, flag gaps, and generate a shareable **Equity Brief** you can take straight into a meeting.

No expertise required. No spreadsheets. No consultants.

-----

## Equity Dimensions Scored

|Dimension                  |What It Evaluates                                                                                                                                            |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|🦽 **Disability Access**    |Does the policy address Disabled people’s heightened climate vulnerability? Are accommodations, accessible infrastructure, and disability-led input built in?|
|🚌 **Transit Equity**       |Does the policy expand or protect public transit access for low-income and transit-dependent riders? Does it avoid car-centric defaults?                     |
|🌡️ **Heat Vulnerability**   |Does the policy protect communities disproportionately exposed to extreme heat — including elderly, outdoor workers, and those without home cooling?         |
|🏭 **Environmental Justice**|Does the policy reduce or worsen pollution burdens in historically overburdened communities? Does it center frontline voices?                                |
|🏘️ **Community Benefit**    |Are the economic and health benefits distributed equitably? Does the policy avoid displacement, gentrification, or green-washing?                            |

Each dimension is scored **0–100**, with a composite **Equity Score** and a tiered rating:

- 🟢 **Strong (80–100)** — Equity-centered policy
- 🟡 **Developing (55–79)** — Meaningful progress, gaps remain
- 🟠 **Emerging (35–54)** — Equity considerations present but incomplete
- 🔴 **Insufficient (0–34)** — Significant equity gaps identified

-----

## The Equity Brief Output

Every analysis generates a structured **Equity Brief** containing:

- ✅ **Equity strengths** — what the policy gets right
- ⚠️ **Equity gaps** — what’s missing or underaddressed
- 💡 **Recommended amendments** — concrete, actionable language
- 📋 **A score breakdown** by dimension

The brief is designed to be copied directly into a public comment, a council testimony, a grant narrative, or a coalition memo.

-----

## Built for Philadelphia. Applicable Everywhere.

The AI is trained with Philadelphia-specific context:

- **SEPTA** service equity and transit-dependent ridership
- **Heat mortality** patterns in North and West Philadelphia
- **Environmental justice** communities mapped by PHL Health Department
- **Disability demographics** and heat vulnerability from city datasets

But the tool works for **any city or policy**. The equity framework is universal.

-----

## Architecture

```
climate-equity-simulator/
├── index.html          # Full single-page application (UI + API logic)
├── server.js           # Express proxy server (hides API key)
├── package.json        # Node.js dependencies
└── README.md           # You are here
```

**Frontend:** Vanilla HTML/CSS/JavaScript — no build tools, no frameworks, maximum accessibility.

**Backend:** Node.js + Express proxy deployed on [Render](https://render.com), which secures the Anthropic API key server-side so any user can access the tool without credentials.

**AI Engine:** [Claude Sonnet](https://anthropic.com) via the Anthropic API, with a structured JSON output schema and a Philadelphia-specific system prompt.

-----

## How It Works

```
User inputs policy text
        ↓
Frontend sends request to Render proxy server
        ↓
Proxy server adds API key + forwards to Anthropic
        ↓
Claude analyzes policy across 5 equity dimensions
        ↓
Returns structured JSON (scores + Equity Brief)
        ↓
Frontend renders interactive results + brief
```

No user API key needed. No login. No data stored.

-----

## Running Locally

**Prerequisites:** Node.js 18+, an [Anthropic API key](https://console.anthropic.com)

```bash
# Clone the repo
git clone https://github.com/meyeringn/climate-equity-simulator.git
cd climate-equity-simulator

# Install dependencies
npm install

# Set your API key
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Start the proxy server
npm start
# → Running on http://localhost:3000

# Open index.html in your browser
# Update the fetch URL in index.html to point to http://localhost:3000/analyze
```

-----

## Deploying Your Own Instance

This tool is designed to be forkable and self-hostable.

1. **Fork** this repo
1. **Deploy the proxy** to [Render](https://render.com) (free tier works):
- New Web Service → connect your fork
- Add environment variable: `ANTHROPIC_API_KEY = sk-ant-...`
1. **Deploy the frontend** to GitHub Pages:
- Settings → Pages → Deploy from main branch
1. **Update the fetch URL** in `index.html` to point to your Render URL

Full deployment takes ~40 minutes. See <DEPLOY.md> for step-by-step instructions.

-----

## Example Use Cases

- 🏛️ **City council advocates** reviewing proposed ordinances before a hearing
- 🌱 **Environmental justice orgs** generating rapid equity analyses for coalition partners
- 🎓 **Civic tech students and fellows** learning to apply AI to policy workflows
- 📝 **Grant writers** documenting equity analysis in climate funding applications
- ♿ **Disability advocates** ensuring climate plans don’t leave Disabled communities behind

-----

## Part of the “Vibe Coding for Climate Action” Portfolio

This tool is part of a growing suite of AI-powered civic climate tools built for real-world use:

|Tool                                                                                   |What It Does                                                     |Status  |
|---------------------------------------------------------------------------------------|-----------------------------------------------------------------|--------|
|[**SustAInable**](https://github.com/meyeringn/sustainable-heat)                       |XGBoost heat illness risk prediction by ZIP code                 |✅ Live  |
|[**UpLift**](https://github.com/meyeringn/uplift-transit)                              |Predictive maintenance for transit accessibility infrastructure  |✅ Live  |
|[**CanopyWatch**](https://meyeringn.github.io/canopy-watch)                            |Tree canopy equity dashboard for 36 Philadelphia neighborhoods   |✅ Live  |
|[**Transit Carbon Calculator**](https://github.com/meyeringn/transit-carbon-calculator)|Statewide PA transit emissions comparison tool                   |✅ Live  |
|[**VitalGrid**](https://github.com/meyeringn/vitalgrid)                                |Power outage vulnerability mapping for Philadelphia neighborhoods|🔄 Active|
|[**FloodRisk Philly**](https://github.com/meyeringn/floodrisk-philly)                  |Flood risk lookup tool for Philadelphia renters                  |🔄 Active|
|**Climate Equity Policy Simulator**                                                    |AI scoring of policy proposals across 5 equity dimensions        |✅ Live  |

-----

## About the Builder

**Nick Meyering** is a civic technologist, Disabled SEPTA rider, and Deployment Success Manager at FreedomPay based in Philadelphia. He holds an MPA and completed the [Equitech Futures Civic Tech Institute (CTI 2026)](https://equitechfutures.com). He serves as Chairman of the Philadelphia Mayor’s Commission on People with Disabilities, VP of Growth & Partnerships at Net Impact Philadelphia, and Steering Committee member of Transit Forward Philadelphia, among other civic roles.

His work sits at the intersection of **disability justice, transit equity, and civic technology** — building tools that make policy more accountable to the communities bearing the greatest climate burdens.

🌐 [github.com/meyeringn](https://github.com/meyeringn) · 💼 [LinkedIn](https://linkedin.com/in/nickmeyering) · 🐦 Built in Philadelphia 🧡🖤

-----

## Contributing

This is an open civic project. Contributions welcome — especially:

- Additional equity dimensions or scoring refinements
- City-specific system prompt variants (open a PR or Issue)
- Accessibility improvements to the UI
- Translation/localization support

Please open an Issue before submitting a large PR so we can align on direction.

-----

## License

MIT License — use it, fork it, adapt it for your city.

If you build something with this, please tag [@meyeringn](https://github.com/meyeringn) or drop a link. I’d love to see where it goes.

-----

*Built with the belief that every climate policy should have to answer for who it helps — and who it leaves behind.*
