const dbRoute = "mongodb+srv://Harry:Harry12345@cluster0-ingaq.mongodb.net/test?retryWrites=true";
const saltRounds = 10;

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("connected to MongoDB"));

const Product = require("./model/Product");
const User = require("./model/User");
const mongo = {
    getAllProduct: async(res) => {
        Product.find(
            (err, product) => {
                if(err) return res.json({success: false, data: null, msg: err});
                return res.json({success: true, data: product, msg: null});
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
                    return res.json({success: false, data: null, msg: err});
                }
                console.log(`add new product: ${data.name}`);
                return res.json({ success: true, data: null, msg: null });
            }
        );
    },
    deleteProduct: async(req, res) => {
        const name = req.body;
        Product.findOneAndDelete(
            name, err => {
                if (err) return res.send(err);
                console.log(`delete product: ${name.name}`)
                return res.json({ success: true, data: null, msg: null });
            }
        );
    },
    createUser: async(req, res) => {
        let user = req.body;
        const userExists = await User.findOne({userName: user.userName});
        if(userExists){
            return res.json({ success: false, data: null, msg: 'userName has already existed' });
        }

        user.password = await bcrypt.hash(user.password, saltRounds);
        const newUser = new User(user);
        await newUser.save();

        return res.json({ success: true, data: null, msg: null});
    },
    login: async(req, res) => {
        const user = await User.findOne({userName: req.body.userName});
        if(!user){
            return res.json({ success: false, data: null, msg: "No such user!" });
        }

        const compare = await bcrypt.compare(user.password, req.body.password);
        if(!compare){
            return res.json({ success: false, data: null, msg: 'password is wrong' });
        }

        console.log("todo")
        return res.json({success: true, data: user.userName, msg: null});
    },
}

module.exports = mongo;

