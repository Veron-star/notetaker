const fs = require("fs");
const path = require("path");
const util = require("util");
const express = require("express");
const app = express();

// create promises for the program
const readFileAsync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

// create 'Storage' class which data array will be created inside the constructor
class Storage {
    constructor() {
        this.lastId = 0;
    };
    read() {
        return readFileAsync(path.join(_dirname, "db.json"), "utf8");
    };
    write(note) {
        return writeFileSync(path.join(_dirname, "db.json"), JSON.stringify(note));
    };
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes = JSON.parse(notes);
            console.log(parsedNotes);
            return parsedNotes;
        });
    };
    addNotes(newNote) {
        console.log(newNote);
        return this.getNotes().then(notes => {
            const newList = [...notes, newNote];
            console.log(newList);
            return this.write(newList);
        });
    };
    deleteNotes(title) {
        return this.getNotes().then(notes => {
            console.log("To do list:" + title);
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].title === title) {
                    notes.splice(i, 1);
                    console.log(notes);
                    break;
                };
            };
            this.write(notes);
        });
    };
};

const storage = new Storage();

module.exports = storage;