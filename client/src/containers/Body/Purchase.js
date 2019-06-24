import React, { Component } from "react";
import './Purchase.css'
import ProductItemPur from '../../components/ProductItemPur'

class Purchase extends Component {
    render() {
        let items = Object.keys(this.props.shop_list);
        let total = 0;

        return(
        <div className="Container2">
            <ul className="Purchase">
                {
                    items.map(
                        (item, index) => {
                            let num = this.props.shop_list[item];
                            let product = this.props.data.filter(
                                (data) => {
                                    return data['name'] === item;
                                }
                            )[0]

                            if(num !== 0){
                                total = total + num * product.price;
                                return <ProductItemPur 
                                            key={index} 
                                            data={product} 
                                            num={num}
                                            addOneMoreProduct={this.props.addOneMoreProduct}
                                            deleteOneProduct={this.props.deleteOneProduct}/>;
                            }
                        }
                    )
                }
            </ul>
            <div className="Container3">
                <h1>Total cost: {(total).toFixed(2)}</h1>
                <button className="Button2" onClick={this.props.clearShopList}> Clear </button>
                <button className="Button2" onClick={this.props.buy}> Buy </button>
            </div>
        </div>
        );
    }
}
export default Purchase;