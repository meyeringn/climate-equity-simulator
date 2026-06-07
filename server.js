
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());

// ── HEALTH CHECK ──
// Render uses this to confirm your server is alive
app.get('/', (req, res) => {
res.json({ status: 'Climate Equity Policy Simulator proxy is running.' });
});

// ── PROXY ENDPOINT ──
// Your index.html will POST policy data here
// This server adds the secret API key and forwards to Anthropic
app.post('/analyze', async (req, res) => {

// Make sure there's actually a message to send
if (!req.body || !req.body.messages) {
return res.status(400).json({ error: 'No messages provided.' });
}

// Make sure the API key exists in Render's environment
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
return res.status(500).json({ error: 'API key not configured on server.' });
}

try {
// Forward the request to Anthropic with your hidden key
const response = await fetch('https://api.anthropic.com/v1/messages', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'x-api-key': apiKey,
'anthropic-version': '2023-06-01',
},
body: JSON.stringify({
model: 'claude-sonnet-4-20250514',
max_tokens: 1500,
system: req.body.system,
messages: req.body.messages,
}),
});

// If Anthropic returns an error, pass it back clearly
if (!response.ok) {
const err = await response.json();
return res.status(response.status).json({ error: err.error?.message || 'Anthropic API error.' });
}

// Send the result back to the browser
const data = await response.json();
res.json(data);

} catch (err) {
console.error('Proxy error:', err);
res.status(500).json({ error: 'Server error. Please try again.' });
}
});

// ── START SERVER ──
app.listen(PORT, () => {
console.log(`Proxy server running on port ${PORT}`);
});
