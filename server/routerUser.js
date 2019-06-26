const express = require("express");
const router = express.Router();

const db = require("./database/mongodb");

router.post("/login", async (req, res) => {
    const result = await db.login(req.body)
    console.log(result)
    res.json(result)
})

router.post("/register", async (req, res) => {
    const result = await db.register(req.body)
    res.json(result)
})

router.post("/checkUserName", async (req, res) => {
    const result = await db.checkUserName(req.body.userName);
    if (result) {
        res.json({exists: true})
    }
    else res.json({exists: false})
})

router.get("/getAllUsers", async (req, res) => {
    const result = await db.getAllUser()
    res.json({users:result})
})

module.exports = router;