import express, { json } from 'express';
import { readFileSync } from 'fs';
import cors from 'cors'; // Import CORS
const app = express();
const PORT = 3000;

app.use(cors()); // ✅ Enable CORS for all routes
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
