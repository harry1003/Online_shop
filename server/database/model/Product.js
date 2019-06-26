const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        id: String,
        name: String,
        author: String,
        category: String,
        overview: String,
        language: String,
        price: Number,
        year: Number,
        capacity: Number,
        img: {data: Buffer, contentType: String},
        url: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);