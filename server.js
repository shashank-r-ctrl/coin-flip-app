const express = require('express');
const path = require('path');

const app = express();

// MEMORY STORAGE (FAST & WORKING)
let flips = [];

app.use(express.static(path.join(__dirname, 'public')));

// flip route
app.get('/flip', (req, res) => {
  const result = Math.random() > 0.5 ? "Heads" : "Tails";

  flips.push({ result });

  res.json({ result });
});

// history route
app.get('/history', (req, res) => {
  res.json(flips);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});