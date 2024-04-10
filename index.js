import express from 'express';
import Database from 'better-sqlite3';

const app = express();
app.use(express.json());

const dbConnection = new Database('books.db', { verbose: console.log })

app.get('/sql-injection/books', async (req, res) => {
    const id = req.query.id;

    const book = dbConnection.prepare(`select * from books where id = ${id}`).all();

    return res.status(200).json(book);
});

app.get('/protected-by-lib/books', async (req, res) => {
    const id = req.query.id;

    const book = dbConnection.prepare('select * from books where id = ?').all(id);

    return res.status(200).json(book);
});

app.get('/protected-by-regexp/books', async (req, res) => {
    const id = req.query.id;

    const sqlInjectionRegExp = /(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i;
    if (sqlInjectionRegExp.test(id)) {
        const treatedId = id.split(sqlInjectionRegExp.exec(id)[0])[0];

        const book = dbConnection.prepare(`select * from books where id = ${treatedId}`).all();
        return res.status(201).json({ message: 'SQL Injection!', book });
    }

    const book = dbConnection.prepare(`select * from books where id = ${id}`).all();

    return res.status(200).json(book);
});


app.get('/', (req, res) => {
    return res.send('SQL Injection - Exemplo Simples')
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});