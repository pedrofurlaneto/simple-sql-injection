# Simple SQL Injection API Example 📖
Welcome to the Bookworm's Delight API. This API is a scholarly study on SQL Injection, providing a list of books from a SQLite database with various GET routes. It's a simple example for educational purposes, demonstrating both vulnerable and secure coding practices.

## Routes
### `/sql-injection/books` 🚫
- **GET**: Retrieves a book by ID. This route intentionally exposes SQL Injection vulnerability for educational insight!

### `/protected-by-lib/books` 🔒
- **GET**: Fetches a book by ID, employing parameterized queries to safeguard against SQL Injection.

### `/protected-by-regexp/books` 🛡️
- **GET**: Obtains a book by ID, using regular expressions to prevent SQL Injection attempts. 

## How to Run 🏃‍♂️
1. Clone the repository.
2. Install dependencies (`npm install`).
3. Start the server (`npm start`).

The server will be operational at `http://localhost:3000`.

## Security 🔐
The routes `/protected-by-lib/books` and `/protected-by-regexp/books` are fortified against SQL Injection. The route `/sql-injection/books` serves as a stark reminder of the importance of secure coding practices.

:)
