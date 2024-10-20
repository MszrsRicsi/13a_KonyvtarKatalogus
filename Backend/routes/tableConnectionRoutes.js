const router = require("express").Router();
const db = require("./database");

//Get all connections.
router.get("/", (req, res) => {
    db.query(`SELECT books.title, authors.name FROM book_authors, books, authors WHERE books.id = book_authors.bookID AND book_authors.authorID = authors.id`, (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        res.status(200).send(results);
    });
});

//Link author to book.
router.post("/:bookId/authors/:authorId", (req, res) => {
    if (!req.params.bookId || !req.params.authorId)
    {
        res.status(406).send("Missing fields!");
        return;
    }

    db.query(`INSERT INTO book_authors VALUES (?, ?)`, [req.params.bookId, req.params.authorId], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }
    
        res.status(200).send("Author successfully linked to the book!");
    });
});

module.exports = router;