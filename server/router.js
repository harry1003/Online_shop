const express = require("express");
const router = express.Router();
const db = require("./database/mongodb");

router.get("/getAllProduct", (req, res) => {
    db.getAllProduct(res)
});

router.post("/addProduct", (req, res) => {
    db.addProduct(req, res);
});

router.delete("/deleteProduct", (req, res) => {
    db.deleteProduct(req, res);
});

router.post("/sendOrder", ((req, res)=> {
    console.log(req.body);
}));

module.exports = router;