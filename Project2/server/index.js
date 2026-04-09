const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all items in mylist
app.get('/api/mylist', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM mylist ORDER BY created_at DESC').all();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new item to mylist
app.post('/api/mylist', (req, res) => {
    const { anime_id, title, image_url, status, rating, review } = req.body;

    if (!anime_id || !title) {
        return res.status(400).json({ error: 'anime_id and title are required' });
    }

    try {
        const stmt = db.prepare(`
      INSERT INTO mylist (anime_id, title, image_url, status, rating, review)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
        const info = stmt.run(
            anime_id,
            title,
            image_url || '',
            status || 'plan_to_watch',
            rating || 0,
            review || ''
        );
        res.status(201).json({ id: info.lastInsertRowid, message: 'Added to My List!' });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            // Update instead
            try {
                const stmt = db.prepare(`
          UPDATE mylist SET status = ?, rating = ?, review = ? WHERE anime_id = ?
        `);
                stmt.run(status || 'plan_to_watch', rating || 0, review || '', anime_id);
                res.json({ message: 'Updated in My List!' });
            } catch (updateErr) {
                res.status(500).json({ error: updateErr.message });
            }
        } else {
            res.status(500).json({ error: err.message });
        }
    }
});

// PUT update an item
app.put('/api/mylist/:id', (req, res) => {
    const { id } = req.params;
    const { status, rating, review } = req.body;

    try {
        const stmt = db.prepare(`
      UPDATE mylist SET status = ?, rating = ?, review = ? WHERE id = ?
    `);
        const info = stmt.run(status, rating, review, id);
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: 'Updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE an item
app.delete('/api/mylist/:id', (req, res) => {
    const { id } = req.params;

    try {
        const stmt = db.prepare('DELETE FROM mylist WHERE id = ?');
        const info = stmt.run(id);
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        res.json({ message: 'Deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
