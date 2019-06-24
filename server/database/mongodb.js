const dbRoute = "mongodb+srv://Harry:Harry12345@cluster0-ingaq.mongodb.net/test?retryWrites=true";
const Product = require("./model/Product");

const mongoose = require("mongoose");
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("connected to MongoDB"));

const mongo = {
    getAllProduct: async(res) => {
        Product.find(
            (err, product) => {
                if(err) return res.json({success: false, error: err});
                return res.json({success: true, data: product});
            }
        );
    },
    addProduct: async(req, res) => {
        let recieve = req.body;
        recieve["img"] = {data: "", contentType: ""};
        if(req.file != undefined){
            recieve["img"].data = req.file.buffer;
            recieve["img"].contentType = req.file.mimetype;
        }

        const data = await new Product(recieve);
        data.save(
            err => {
                if (err){
                    console.log(`Error: ${err}`);
                    return res.json({success: false, error: err});
                }
                console.log(`add new product: ${data.name}`);
                return res.json({ success: true });
            }
        );
    },
    deleteProduct: async(req, res) => {
        const name = req.body;
        Product.findOneAndDelete(
            name, err => {
                if (err) return res.send(err);
                console.log(`delete product: ${name.name}`)
                return res.json({ success: true });
            }
        );
    }
}

module.exports = mongo;

