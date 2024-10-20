const uuid = require("uuid");
const router = require("express").Router();
const db = require("./database");

//Get all authors.
router.get("/", (req, res) => {
    db.query(`SELECT * FROM authors`, (err, results) => {
        if (err)
            {
                res.status(500).send("Error while trying to access the database!");
                return;
            }
    
            res.status(200).send(results);
    });
});

//Add new author.
router.post("/", (req, res) => {
    if (!req.body.name || !req.body.birth)
    {
        res.status(300).send("Missing fields!");
        return;
    }

    db.query(`INSERT INTO authors VALUES('${uuid.v4()}', ?, ?)`, [req.body.name, req.body.birth], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }
    
        res.status(200).send("Added new author!");
    });
});

//Modify author.
router.patch("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }

    if (!req.body.newName || !req.body.newBirthDate)
    {
        res.status(406).send("Missing fields!");
        return;
    }

    db.query(`UPDATE authors SET name = ?, birth = ? WHERE id = ?`, [req.body.newName, req.body.newBirthDate, req.params.id], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }
    
        res.status(200).send("Author successfully modified!");
    });
});

//Delete author.
router.delete("/:id", (req, res) => {
    if (!req.params.id)
    {
        res.status(406).send("Missing identifier!");
        return;
    }
        
    db.query(`DELETE FROM authors WHERE id = ?`, [req.params.id], (err, results) => {
        if (err)
        {
            res.status(500).send("Error while trying to access the database!");
            return;
        }
            
        res.status(200).send("Author successfully deleted!");
    });
});

module.exports = router;