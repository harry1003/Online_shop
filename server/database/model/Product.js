const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        id: Number,
        name: String,
        url: String,
        img: Buffer,
        author: String,
        price: Number,
        overview: String,

        category: String,
        language: String,
        year: Number,
        capacity: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);