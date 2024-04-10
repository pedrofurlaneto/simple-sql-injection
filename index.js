import express from 'express';
import Database from 'better-sqlite3';

const app = express();
app.use(express.json());

const dbConnection = new Database('books.db', { verbose: console.log })

app.get('/sql-injection/books', async (req, res) => {
    const id = req.query.id;

    const books = dbConnection.prepare(`select * from books where id = ${id}`).all();

    return res.status(200).json(books);
});

app.get('/protected/books', async (req, res) => {
    const id = req.query.id;

    const books = dbConnection.prepare(`select * from books where id = ?`).all(id);

    return res.status(200).json(books);
});

app.get('/', (req, res) => {
    return res.send('SQL Injection - Exemplo Simples')
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});