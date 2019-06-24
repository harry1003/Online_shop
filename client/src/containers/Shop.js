import React, { Component } from 'react';
import axios from 'axios'

import Header from "./Header/Header"
import Body from "./Body/Body"

// Todo: move this list to db
let cat_list = ["All", "Action", "Anthologies", "Dark Fantasy", "Fantasy Epics", "Horror", "Role Playing"];

async function check_data(data){
     let isValid = !Object.keys(data).some(
        (item) => {
            if(data[item] === ""){
                alert(`${item} should not be empty`);
                return true;
            }
        }
    )
    return {"data": data, "isValid": isValid};
}

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mode: 'All',
            category_list: cat_list,
            data: [],
            shop_list: {},
        };
    }

    componentDidMount(){
        this.getProductFromDb();
    }

    getProductFromDb = () => {
        fetch("http://localhost:3001/api/getAllProduct")
        .then(data => data.json())
        .then(res => {
                this.setState(
                    state => {
                        state.data = res.data;
                        return state;
                    }
                )  
            }
        );
    };

    addProductToDb = (product_data) => {
        axios.post("http://localhost:3001/api/addProduct", product_data)
        .then(res => {this.getProductFromDb();})
        .catch(err => { console.log(err) })
        .then(alert(`successfully add ${product_data.name}`))
    };

    sendOrderToDb = (order) => {
        axios.post("http://localhost:3001/api/sendOrder", order)
        .then(alert("order sent"))
        .catch(err => {console.log(err)})
    }

    deleteProductToDb = (name2delete) => {
        axios.delete("http://localhost:3001/api/deleteProduct", {
            data: {
                "name": name2delete
            }
        })
        .then(res => {this.getProductFromDb();})
        .catch(err => {console.log(err)})
        .then(alert(`successfully delete ${name2delete}`))
    }

    changeMode = (event) => {
        let category = event.target.innerHTML;
        this.setState(
            state => {
                state.mode = category;
                return state;
            }
        )
    }

    addProductToShopList = (event) => {
        let id = event.target.className.indexOf(" ");
        let name = event.target.className.slice(id + 1);
        if(this.state.shop_list[name] === undefined){
            this.setState(
                state => {
                    state.shop_list[name] = 1;
                    return state;
                }
            )
        }
        else{
            this.setState(
                state => {
                    state.shop_list[name] = state.shop_list[name] + 1;
                    return state;
                }
            )
        }
    }

    addOneMoreProduct = (event) => {
        let id = event.target.className.substr(8);
        this.setState(
            state => {
                state.shop_list[id] = state.shop_list[id] + 1;
                return state;
            }
        )
    }

    deleteOneProduct = (event) => {
        let id = event.target.className.substr(8);
        this.setState(
            state => {
                state.shop_list[id] = state.shop_list[id] - 1;
                return state;
            }
        )
    }

    clearShopList = () => {
        this.setState(
            state => {
                state.shop_list = {};
                return state;
            }
        )
    }

    buy = () => {
        // Todo: check if the list is empty
        this.sendOrderToDb(this.state.shop_list);
    }

    addProduct = (event) => {
        let form = document.forms["add_product"];
        let data = {};
        data["id"] = form["id"].value;
        data["name"] = form["name"].value;
        data["url"] = form["url"].value;
        data["author"] = form["author"].value;
        data["price"] = form["price"].value;
        data["overview"] = form["overview"].value;
        data["category"] = form["category"].value;
        data["language"] = form["language"].value;
        data["year"] = form["year"].value;
        data["capacity"] = form["capacity"].value;

        check_data(data)
        .then(data => { 
            if(data.isValid !== false) 
                this.addProductToDb(data.data);
        })
    }

    deleteProduct = () => {
        // Todo: check if product exist
        let form = document.forms["delete_product"];
        let name = form["name"].value;
        this.deleteProductToDb(name);
    }

    render() {
        return (
            <div>
                <Header data={this.state.data} 
                        shop_list={this.state.shop_list}/>
                <Body
                    mode={this.state.mode}
                    category_list = {this.state.category_list}
                    data={this.state.data}
                    shop_list={this.state.shop_list}

                    changeMode={this.changeMode}
                    addProductToShopList={this.addProductToShopList}
                    addOneMoreProduct={this.addOneMoreProduct}
                    deleteOneProduct={this.deleteOneProduct}
                    clearShopList={this.clearShopList}
                    buy={this.buy}

                    addProduct={this.addProduct}
                    deleteProduct={this.deleteProduct}
                />
            </div>
        );
    }
}
export default Shop;