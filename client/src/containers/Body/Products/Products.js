import React, { Component } from "react";
import './Products.css';
import ProductItem from '../../../components/ProductItem';

class Products extends Component {
    render() {
        let product2show = [];
        if(this.props.mode === "All"){
            product2show = this.props.data;
        }
        else{
            product2show = this.props.data.filter(
                (item) => {
                    return item.category === this.props.mode;
                }
            );
        }

        return(
        <div className="Products">
            {
                product2show.map(
                    (item, index) => {
                        return <ProductItem 
                                    onClick={this.props.addProductToShopList} 
                                    data={item}
                                    key={index}/>
                    }
                )
            }
        </div>
        );
    }
}
export default Products;