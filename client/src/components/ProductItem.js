import React from 'react';
import './ProductItem.css'

export default ({ onClick, data }) => {
    let object_class_name = "Button " + data.name;
    let img = "";
    if(data.url !== "")
        img = data.url;
    else
        img = data.img;
        
    return (
        <div className="Product_item">
            <img className="Product_img" src={img}/>
            <br/>
            <h1 className="Name">{data.name}</h1>
            <p>Author: {data.author}</p>
            <p>Price: {data.price}</p>
            <button onClick={onClick} className={object_class_name}>Add to cart</button>
        </div>
    );
}