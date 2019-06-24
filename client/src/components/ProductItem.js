import React from 'react';
import './ProductItem.css'

export default ({ onClick, data }) => {
    let object_class_name = "Button " + data.name;
    
    let img = "";
    if(data.url !== "")
        img = data.url;
    else{
        // https://stackoverflow.com/questions/43628400/meteor-react-render-image-from-array-buffer
        // https://stackoverflow.com/questions/49123222/converting-array-buffer-to-string-maximum-call-stack-size-exceeded
        let buffer = btoa(new Uint8Array(data.img.data.data).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, ''));
        img = "data:" + data.img.contentType + ";base64," + buffer;
    }
    
    return (
        <div className="Product_item">
            <img className="Product_img" src={img} alt="product img"/>
            <br/>
            <h1 className="Name">{data.name}</h1>
            <p>Author: {data.author}</p>
            <p>Price: {data.price}</p>
            <button onClick={onClick} className={object_class_name}>Add to cart</button>
        </div>
    );
}