const router = require("express").Router();
const storage = require("./../db/storage");

router.get("/notes", function (req, res) {
    storage
        .getNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post("/notes", function (req, res) {
    storage 
        .addNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.delete("/notes", function (req, res) {
    storage
        .deleteNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

module.exports = router;