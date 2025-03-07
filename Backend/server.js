const express = require('express');
const { json } = require('express');
const { readFileSync } = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

// Load JSON data
let portfolioData = JSON.parse(readFileSync('portfolio.json', 'utf-8'));

// Routes
app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.get('/api/skills', (req, res) => {
  res.json(portfolioData.skills);
});

app.get('/api/education', (req, res) => {
  res.json(portfolioData.education);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
