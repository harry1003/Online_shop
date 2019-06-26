const express = require("express");
const router = express.Router();

const db = require("./database/mongodb");

router.post("/createUser", (req, res) => {
    db.createUser(req, res);
});

router.post("/login", (req, res) => {
     db.login(req, res);
});

router.post("/logout", (req, res) => {
    
});

module.exports = router;