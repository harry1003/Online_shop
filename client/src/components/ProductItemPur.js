import React from 'react';
import './ProductItemPur.css'

export default ({ addOneMoreProduct, deleteOneProduct, num, data }) => {
    let classname = "Button3 " + data.name;

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
        <div className="ProductItemPurchase">
            <img className="Img" src={img} alt="product img"/>
            <div className="Text-wrapper">
                <h1>{data.name}</h1>
                <div className="Text-wrapper2">
                    <h2 className="Quantity">Quantity:  {num} </h2> 
                    <h2 className="Price">$ {(num * data.price).toFixed(2)}</h2>
                </div>
            </div>
            <div className="Text-wrapper3">
                <h2 className={classname} onClick={addOneMoreProduct}> + </h2>
                <h2 className={classname} id="minus" onClick={deleteOneProduct}> - </h2>
            </div>
        </div>
    );
}