// server.js
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Allow your server to parse JSON bodies in requests
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// ===== Part 2: Basic Setup =====
app.get('/', (req, res) => {
    res.send('Hello World');
});

// ===== Part 3: RESTful Design (CRUD) =====
let books = [
    { id: 1, title: "The Great Gatsby" },
    { id: 2, title: "1984" }
];

// GET: Fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST: Add a new book
app.post('/books', (req, res) => {
    const { title } = req.body;
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title: title
    };
    books.push(newBook);
    res.status(201).json(books);
});

// PATCH: Update a book's title by ID
app.patch('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const book = books.find(b => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    book.title = title;
    res.json(book);
});

// DELETE: Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id !== parseInt(id));
    res.json(books);
});

// ===== Part 5: EJS Templating =====
app.get('/books/view', (req, res) => {
    res.render('books', { books: books });
});

// ===== Part 6: Secure API Keys & .env =====
app.get('/secrets', (req, res) => {
    res.send(process.env.SPOTIFY_KEY);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
