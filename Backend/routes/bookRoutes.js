const uuid = require("uuid");
const router = require("express").Router();
const db = require("./database");

const isbnRegExp = `^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$`

//Get all books.
router.get("/", (req, res) => {
    db.query(`SELECT * FROM books`, (err, results) => {
        if (err)
            {
                res.status(500).send("Error while trying to access the database!");
                return;
            }
    
            res.status(200).send(results);
    });
});

//Add new book.
router.post("/", (req, res) => {
    if (!req.body.title || !req.body.releaseDate || !req.body.isbn)
    {
        res.status(406).send("Missing fields!");
        return;
    }

    db.query(`SELECT COUNT(*) as 'Found' FROM books WHERE ISBN = ? OR title = ?`, [req.body.isbn, req.body.title], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        if (results[0].Found >= 1)
        {
            res.status(406).send("ISBN or title is already in use!");
            return;
        }

        db.query(`INSERT INTO books VALUES ('${uuid.v4()}', ?, ?, ?)`, [req.body.title, req.body.releaseDate, req.body.isbn], (subErr, subResults) => {
            if (subErr)
            {
                res.status(500).send("Error while trying to access the database!");
                return;
            }
            
            res.status(200).send("Book successfully added!");
            return;
        });
    });
});

//Modify book.
router.patch("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }

    if (!req.body.newTitle || !req.body.newReleaseDate || !req.body.newIsbn)
    {
        res.status(406).send("Missing fields!");
        return;
    }

    db.query(`SELECT COUNT(*) as 'Found' FROM books WHERE id != ? AND (ISBN = ? OR title = ?)`, [req.params.id, req.body.newIsbn, req.body.newTitle], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }

        if (results[0].Found >= 1)
        {
            res.status(406).send("ISBN or title is already in use!");
            return;
        }

        db.query(`UPDATE books SET title = ?, releaseDate = ?, ISBN = ? WHERE id = ?`, [req.body.newTitle, req.body.newReleaseDate, req.body.newIsbn, req.params.id], (subErr2, subResults2) => {
            if (subErr2)
            {
                res.status(500).send("Error while trying to access the database!");
                return;
            }
            
            res.status(200).send("Book successfully modified!");
        });
    });
});

//Delete book.
router.delete("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }
    
    db.query(`DELETE FROM books WHERE id = ?`, [req.params.id], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }
        
        res.status(200).send("Book successfully deleted!");
    });
});

module.exports = router;