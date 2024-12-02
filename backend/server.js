const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve articles
app.get('/articles', (req, res) => {
    const filePath = path.join(__dirname, 'articles.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading articles.json:', err);
            res.status(500).json({ error: 'Failed to load articles' });
            return;
        }

        res.json(JSON.parse(data));
    });
});

// Serve individual article content
app.get('/article/:id', (req, res) => {
    const filePath = path.join(__dirname, 'articles.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading articles.json:', err);
            res.status(500).json({ error: 'Failed to load article' });
            return;
        }

        const articles = JSON.parse(data);
        const article = articles.find(a => a.id === parseInt(req.params.id));

        if (!article) {
            res.status(404).json({ error: 'Article not found' });
            return;
        }

        res.json(article);
    });
});

// Serve news updates
app.get('/news', (req, res) => {
    const filePath = path.join(__dirname, 'news.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading news.json:', err);
            res.status(500).json({ error: 'Failed to load news' });
            return;
        }

        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
