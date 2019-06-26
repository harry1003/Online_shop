import React, { Component } from "react";
import { Switch, Route, NavLink}  from "react-router-dom";
import './Body.css'
import List from './List'
import Products from './Products'
import {Form, Form2} from './Form'
import Purchase from './Purchase'

class Body extends Component {
    render() {
        return(
            <div className="Body">
                <List mode={this.props.mode} 
                    changeMode={this.props.changeMode} 
                    category_list={this.props.category_list}/>
                <Switch>
                    <Route exact path="/" render={
                            () => {
                                return(
                                    <div className="Container">
                                        <div className="Route-wrapper">
                                            <NavLink to={"/addProduct"} className='Link'>Add new product</NavLink>
                                            <NavLink to={"/deleteProduct"} className='Link'>Delete product</NavLink>
                                        </div>
                                        <Products 
                                            data={this.props.data}
                                            mode={this.props.mode}
                                            addProductToShopList={this.props.addProductToShopList}/>
                                    </div>
                                );
                            }
                        }
                    />

                    <Route path="/addProduct" render={
                            () => {
                                return (
                                    <Form
                                        category_list={this.props.category_list}
                                        onClick={this.props.addProduct}/>
                                );
                            }
                        }
                    />

                    <Route path="/deleteProduct" render={
                            () => {
                                return(
                                    <Form2 onClick={this.props.deleteProduct}/>
                                );
                            }

                        }
                    />

                    <Route path="/purchase" render={
                            () => {
                                return(
                                    <Purchase 
                                        data={this.props.data}
                                        shop_list={this.props.shop_list}
                                        clearShopList={this.props.clearShopList}
                                        buy={this.props.buy}
                                        addOneMoreProduct={this.props.addOneMoreProduct}
                                        deleteOneProduct={this.props.deleteOneProduct}/>     
                                )
                            }  
                        }
                    />

                    <Route path="/login" render={
                            () => {
                                return(
                                    <div>
                                        Todo: login
                                    </div>
                                )
                            }
                        }
                    />   
                </Switch>
            </div>
        );
    }
}
export default Body;