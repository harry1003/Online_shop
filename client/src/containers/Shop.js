import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios'

import Header from "./Header/Header"
import Body from "./Body/Body"

import withAuth from "./Auth/Auth";
// Todo: move this list to db
let cat_list = ["All", "Action", "Anthologies", "Dark Fantasy", "Fantasy Epics", "Horror", "Role Playing"];

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
        fetch("http://localhost:3001/product/getAllProduct")
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

    addProductToDb = (data) => {
        let send = axios.post("http://localhost:3001/product/addProduct", data)
        .then(res => {
            if(res.data.success){
                this.getProductFromDb();
                return true;
            }
            else{
                alert(res.data.msg);
                return false;
            }
        })
        .catch(err => { alert(`Fail to add new product. ${err}`); console.log(err);})
        if(send) alert(`successfully create product ${data.get("name")}`);
        return send;
    };

    sendOrderToDb = (order) => {
        if(Object.keys(order).length === 0){
            alert("Shopping list is empty");
            return;
        }

        let data = {order:order, userName:this.props.userName}
        axios.post("http://localhost:3001/product/sendOrder", data)
        .then(res => {
            console.log(res.data.success)
            if (res.data.success) alert("Order sent");
            else alert("Purchase failed!")
            this.setState({
                shop_list:{}
            })
            this.props.history.push('/')
        })
        .catch(err => {console.log(err)})
    }

    deleteProductToDb = async (name2delete) => {
        let del = false;
        await axios.delete("http://localhost:3001/product/deleteProduct", {
            data: { "name": name2delete }
        })
        .then(res => {
            if(res.data.success){
                this.getProductFromDb();
                del = true;
            }
            else{
                alert(res.data.msg);
                del = false;
            }  
        })
        if(del) alert(`successfully delete ${name2delete}`);
        return del;
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
        let id = event.target.className.indexOf(" ");
        let name = event.target.className.slice(id + 1);
        this.setState(
            state => {
                state.shop_list[name] = state.shop_list[name] + 1;
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
        this.sendOrderToDb(this.state.shop_list);
    }

    addProduct = () => {
        // Todo: check if the product exist
        let form = document.forms["add_product"];
        let img = document.getElementById("Img").files[0];
        this.createFormData(form, img)
        .then(data => {return this.addProductToDb(data)})
        .then(
            (send) => {
                if(send){
                    setTimeout(()=>this.props.history.push("/"), 100);
                }
            }
        )
    }

    createFormData = async (form, img) => {
        // https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef
        let data = new FormData();
        let string = ["id", "name", "author", "overview", "category", "language"];
        let number = ["price", "year", "capacity"];
        await string.map(
            (item) => {
                if(form[item].value === "") throw TypeError(`${item} should not be empty`);
                data.append(item, form[item].value)
            }
        )
        await number.map(
            (item) => {
                if(form[item].value === "") throw TypeError(`${item} should not be empty`);
                if(form[item].value <= 0) throw TypeError(`${item} should > 0`);
                data.append(item, form[item].value)
            }
        )

        if(img !== undefined){
            data.append("url", "");
            data.append("img", img);
        }
        else if(img === undefined && form["url"].value === ""){
            throw TypeError(`please upload an image or url`);
        }
        else{
            data.append("url", form["url"].value);
            data.append("img", img);
        }
        
        return data;
    }

    deleteProduct = () => {
        // Todo: check if the product exist
        let form = document.forms["delete_product"];
        let name = form["name"].value;
        this.deleteProductToDb(name)
        .then(
            del => {
                if(del){
                    setTimeout(()=>this.props.history.push("/"), 100);
                } 
            }
        )
    }

    render() {
        return (
            <div>
                <Header data={this.state.data} 
                        shop_list={this.state.shop_list} isAuth={this.props.isAuth} userName={this.props.userName} />
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
                    userName={this.props.userName}
                    isAuth={this.props.isAuth}
                />
            </div>
        );
    }
}
export default withAuth(withRouter(Shop));