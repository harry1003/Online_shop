const dbRoute = "mongodb+srv://Harry:Harry12345@cluster0-ingaq.mongodb.net/test?retryWrites=true";

const saltRounds = 10;
const secret = 'test123';

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
import jwt from 'jsonwebtoken';
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
    login: async (info) => {
        const user = await User.findOne({userName: info.userName});
        //console.log(!user)
        if (!user) return {success:false, msg:"No such user!"};
        const compare = await bcrypt.compare(info.password, user.password);
        if (!compare) {
            return {
                sucess: false,
                msg: 'Password is wrong'
            }
        }
        else {
            return {
                success: true,
                token: jwt.sign({data:info.userName}, secret, {expiresIn: '1h'}),
                userId: user._id
            }
        }
    }
    ,
    register: async (info) => {
        const userExists = await mongo.checkUserName(info.userName);
        if (userExists){
            return {
                success: false,
                msg: 'Username has already existed'
            }
        }
        info.password = await bcrypt.hash(info.password, saltRounds);
        const newUser = new User(info);
        await newUser.save();
        return {
            success: true,
            data: newUser
        }
    },
    checkUserName: async (userName) => {
        const userExists = await User.findOne({userName: userName});
        if (userExists) return true;
        else return false;
    },
    getAllUser: async () => {
        const users = await User.find();
        return users;
    }
}

module.exports = mongo;

