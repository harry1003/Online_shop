const express = require("express");
const router = express.Router();
const db = require("./database/mongodb");
// https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
const multer  = require('multer')
const upload = multer();

router.get("/getAllProduct", (req, res) => {
    db.getAllProduct(res);
});

router.post("/addProduct", upload.single('img'), (req, res) => {
    // req.file => img
    // req.body => txt
    db.addProduct(req, res);
});

router.delete("/deleteProduct", (req, res) => {
    db.deleteProduct(req, res);
});

router.post("/sendOrder", (async (req, res)=> {
    console.log(req.body);
    let result = await db.sendOrder(req.body);
    res.json(result)
}));

module.exports = router;