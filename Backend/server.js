const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "token_system",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to the Online Token Generator API!");
});

// Route to generate and store a token
app.post("/api/generate-token", (req, res) => {
    const tokenValue = require("crypto").randomBytes(16).toString("hex"); // Generate a unique token
    const query = "INSERT INTO tokens (token_value, status) VALUES (?, 'active')";

    db.query(query, [tokenValue], (err, result) => {
        if (err) {
            console.error("Error inserting token into database:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.status(201).json({ token: tokenValue });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
