const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();

// DB
const db = new sqlite3.Database('./db.sqlite');

db.run("CREATE TABLE IF NOT EXISTS flips(result TEXT)");

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.get('/flip', (req, res) => {
  const result = Math.random() > 0.5 ? "Heads" : "Tails";
  db.run("INSERT INTO flips(result) VALUES(?)", [result]);
  res.json({ result });
});

// PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});