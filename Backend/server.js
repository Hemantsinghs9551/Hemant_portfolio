const express = require('express');
const { json } = require('express');
const { readFileSync, writeFileSync } = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

const DATA_FILE = 'portfolio.json';

// Load JSON data
let portfolioData = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));

// Save to file helper
const saveData = () => {
  writeFileSync(DATA_FILE, JSON.stringify(portfolioData, null, 2), 'utf-8');
};

// GET routes
app.get('/api/projects', (req, res) => res.json(portfolioData.projects));
app.get('/api/skills', (req, res) => res.json(portfolioData.skills));
app.get('/api/education', (req, res) => res.json(portfolioData.education));

// POST routes
app.post('/api/projects', (req, res) => {
  const newProject = { id: uuidv4(), ...req.body };
  portfolioData.projects.push(newProject);
  saveData();
  res.status(201).json({ message: 'Project added', newProject });
});

app.post('/api/skills', (req, res) => {
  const newSkillCategory = { id: uuidv4(), ...req.body };
  portfolioData.skills.push(newSkillCategory);
  saveData();
  res.status(201).json({ message: 'Skill category added', newSkillCategory });
});

app.post('/api/education', (req, res) => {
  const newEducation = { id: uuidv4(), ...req.body };
  portfolioData.education.push(newEducation);
  saveData();
  res.status(201).json({ message: 'Education added', newEducation });
});

// PUT routes
app.put('/api/projects/:id', (req, res) => {
  const index = portfolioData.projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    portfolioData.projects[index] = { id: req.params.id, ...req.body };
    saveData();
    res.json({ message: 'Project updated', updatedProject: portfolioData.projects[index] });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.put('/api/skills/:id', (req, res) => {
  const index = portfolioData.skills.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    portfolioData.skills[index] = { id: req.params.id, ...req.body };
    saveData();
    res.json({ message: 'Skill category updated', updatedSkillCategory: portfolioData.skills[index] });
  } else {
    res.status(404).json({ message: 'Skill category not found' });
  }
});

app.put('/api/education/:id', (req, res) => {
  const index = portfolioData.education.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    portfolioData.education[index] = { id: req.params.id, ...req.body };
    saveData();
    res.json({ message: 'Education updated', updatedEducation: portfolioData.education[index] });
  } else {
    res.status(404).json({ message: 'Education not found' });
  }
});

// DELETE routes
app.delete('/api/projects/:id', (req, res) => {
  const index = portfolioData.projects.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    const removedProject = portfolioData.projects.splice(index, 1);
    saveData();
    res.json({ message: 'Project deleted', removedProject });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.delete('/api/skills/:id', (req, res) => {
  const index = portfolioData.skills.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    const removedSkill = portfolioData.skills.splice(index, 1);
    saveData();
    res.json({ message: 'Skill category deleted', removedSkill });
  } else {
    res.status(404).json({ message: 'Skill category not found' });
  }
});

app.delete('/api/education/:id', (req, res) => {
  const index = portfolioData.education.findIndex(e => e.id === req.params.id);
  if (index !== -1) {
    const removedEducation = portfolioData.education.splice(index, 1);
    saveData();
    res.json({ message: 'Education deleted', removedEducation });
  } else {
    res.status(404).json({ message: 'Education not found' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.post('/api/education', (req, res) => {
  const newEducation = req.body;

  fs.readFile(path.join(__dirname, 'portfolio.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    const portfolio = JSON.parse(data);
    portfolio.education.push({ ...newEducation, id: crypto.randomUUID() });

    fs.writeFile(
      path.join(__dirname, 'portfolio.json'),
      JSON.stringify(portfolio, null, 2),
      (err) => {
        if (err) return res.status(500).send('Error writing file');
        res.status(201).send('Education added successfully');
      }
    );
  });
});