const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// DB connection (SAFE MODE)
let db;

try {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: true }
  });

  db.connect(err => {
    if (err) {
      console.log("DB FAILED ❌");
      db = null; // disable DB
    } else {
      console.log("DB CONNECTED ✅");
      db.query("CREATE TABLE IF NOT EXISTS flips(result VARCHAR(10))");
    }
  });

} catch {
  db = null;
}

// static
app.use(express.static(path.join(__dirname, 'public')));

// flip route (SAFE)
app.get('/flip', (req, res) => {
  const result = Math.random() > 0.5 ? "Heads" : "Tails";

  if (db) {
    db.query("INSERT INTO flips(result) VALUES(?)", [result], (err) => {
      if (err) console.log("Insert error");
    });
  }

  res.json({ result });
});

// history route (SAFE)
app.get('/history', (req, res) => {
  if (!db) return res.json([]);

  db.query("SELECT * FROM flips", (err, results) => {
    if (err) return res.json([]);
    res.json(results);
  });
});

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});