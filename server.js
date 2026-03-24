const express = require('express');
const path = require('path');

const app = express();

// LOCAL MYSQL (optional for viva)
// const mysql = require('mysql2');
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "YOUR_PASSWORD",
//   database: "coin_db"
// });

// db.connect(err => {
//   if (err) console.log(err);
//   else console.log("MySQL Connected");
// });

// MEMORY (for deployment)
let flips = [];

// static files
app.use(express.static(path.join(__dirname, 'public')));

// route
app.get('/flip', (req, res) => {
  const result = Math.random() > 0.5 ? "Heads" : "Tails";

  // MySQL insert (for viva)
  // db.query("INSERT INTO flips(result) VALUES(?)", [result]);

  flips.push(result);

  res.json({ result });
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});