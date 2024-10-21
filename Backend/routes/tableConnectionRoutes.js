const uuid = require("uuid");
const router = require("express").Router();
const db = require("./database");

//Get all connections.
router.get("/", (req, res) => {
    db.query(`SELECT book_authors.id, books.title, authors.name FROM book_authors, books, authors WHERE books.id = book_authors.bookID AND book_authors.authorID = authors.id`, (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        res.status(200).send(results);
    });
});

//Get connection by id.
router.get("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }

    db.query(`SELECT authorID, bookID FROM book_authors WHERE id = ?`, [req.params.id], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        res.status(200).send(results);
    });
});

//Connect author to book by id.
router.post("/:bookId/authors/:authorId", (req, res) => {
    if (!req.params.bookId || !req.params.authorId)
    {
        res.status(406).send("Missing fields!");
        return;
    }

    db.query(`SELECT COUNT(*) as 'Found' FROM book_authors WHERE authorID = ? AND bookID = ?`, [req.params.authorId, req.params.bookId], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }
    
        if (results[0].Found >= 1)
        {
            res.status(200).send("Connection already exists!");
            return;
        }

        db.query(`INSERT INTO book_authors VALUES ('${uuid.v4()}', ?, ?)`, [req.params.authorId, req.params.bookId], (subErr, subResults) => {
            if (subErr)
            {
                res.status(500).send("Error while trying to access the database!");
                return;
            }
        
            res.status(200).send("Connection successfully made!");
        });
    });
});

//Modify connection.
router.patch("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }

    if (!req.body.newAuthorID || !req.body.newBookID)
    {
        res.status(406).send("Missing fields!");
        return;
    }

    db.query(`SELECT COUNT(*) as 'Found' FROM book_authors WHERE id != ? AND authorID = ? AND bookID = ?`, [req.params.id, req.body.newAuthorID, req.body.newBookID], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        if (results[0].Found >= 1)
        {
            res.status(200).send("Connection already exists!");
            return;
        }

        db.query(`UPDATE book_authors SET authorID = ?, bookID = ? WHERE id = ?`, [req.params.id, req.body.newAuthorID, req.body.newBookID], (subErr, subResults) => {
            if (subErr)
            {
                res.status(500).send("Error while trying to access the database!");
                return;
            }
        
            res.status(200).send("Connection successfully modified!");
        });
    });
});

//Delete connection by id
router.delete("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }

    db.query(`DELETE FROM book_authors WHERE id = ?`, [req.params.id], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        res.status(200).send("Connection successfully deleted!");
    });
});

module.exports = router;