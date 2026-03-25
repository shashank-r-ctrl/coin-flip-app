const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// MySQL connection (env variables from Render)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: true }
});

db.connect(err => {
  if (err) console.log("DB Error:", err);
  else console.log("MySQL Connected");
});

// create table
db.query("CREATE TABLE IF NOT EXISTS flips(result VARCHAR(10))");

// static
app.use(express.static(path.join(__dirname, 'public')));

// flip API
app.get('/flip', (req, res) => {
  const result = Math.random() > 0.5 ? "Heads" : "Tails";

  db.query("INSERT INTO flips(result) VALUES(?)", [result]);

  res.json({ result });
});

// history API (NEW 🔥)
app.get('/history', (req, res) => {
  db.query("SELECT * FROM flips", (err, results) => {
    if (err) return res.json([]);
    res.json(results);
  });
});

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});