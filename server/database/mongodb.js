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
    addProduct: async(req, res) => {
        console.log(req.body)
        const data = await new Product(req.body);
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

    getAllProduct: async(res) => {
        Product.find(
            (err, product) => {
                if(err) return res.json({success: false, error: err});
                return res.json({success: true, data: product});
            }
        );
    },

    deleteProduct: async(req, res) => {
        const name = req.body;
        Product.findOneAndDelete(
            name, err => {
                if (err) return res.send(err);
                return res.json({ success: true });
            }
        );
    }
}

module.exports = mongo;

