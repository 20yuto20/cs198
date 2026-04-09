// LIBRARIES
const express = require('express');
const app = express();
const mysql = require('mysql2');
const mongoose = require('mongoose');

// ============ SQL CONNECTION ============
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'f4z8sb6',
    database: 'company_db'
});

// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// ============ MONGODB CONNECTION ============
mongoose.connect('mongodb://localhost:27017/companyDB');

const ProjectSchema = new mongoose.Schema({
    name: String,
    budget: Number
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

// MongoDB Connection Verification
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ============ ENDPOINTS ============
// Middleware to parse JSON request bodies
app.use(express.json());

// ------ MONGODB ENDPOINTS ------

// GET all projects from MongoDB
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new project to MongoDB
app.post('/projects', async (req, res) => {
    try {
        const newProject = new ProjectModel(req.body);
        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a project from MongoDB by id
app.delete('/projects/:id', async (req, res) => {
    try {
        await ProjectModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ------ MYSQL ENDPOINTS ------

// GET all employees from MySQL
app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// POST a new employee to MySQL
app.post('/employees', function (req, res) {
    const { name, position, salary } = req.body;
    connection.query(
        'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)',
        [name, position, salary],
        function (err, results) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

// DELETE an employee from MySQL by id
app.delete('/employees/:id', function (req, res) {
    connection.query(
        'DELETE FROM employees WHERE id = ?',
        [req.params.id],
        function (err, results) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: 'Employee deleted successfully' });
        }
    );
});

// ============ START SERVER ============
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
    verifyMySQLConnection();
});
