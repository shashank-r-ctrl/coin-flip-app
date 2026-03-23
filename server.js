const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./db.sqlite');

db.run("CREATE TABLE IF NOT EXISTS flips(result TEXT)");

app.use(express.static('public'));

app.get('/flip', (req, res) => {
    const result = Math.random() > 0.5 ? "Heads" : "Tails";

    db.run("INSERT INTO flips(result) VALUES(?)", [result]);

    res.json({ result });
});

app.listen(3000, () => console.log("Server running"));