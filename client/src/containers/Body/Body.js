import React, { Component } from "react";
import { Switch, Route, NavLink, withRouter}  from "react-router-dom";
import './Body.css'
import List from './List/List'
import Products from './Products/Products'
import {Form, Form2} from './Form/Form'
import Purchase from './Purchase/Purchase'
import Login from './Login/Login'
import Register from './Login/Register'
import Profile from './Profile/Profile'

class Body extends Component {
    render() {
        let list = <List mode={this.props.mode} 
        changeMode={this.props.changeMode} 
        category_list={this.props.category_list}/>

        return(
            <div className="Body">
                {list}
                <Switch>
                    <Route exact path="/" render={
                            () => {
                                return(
                                    <div className="Container">
                                            {this.props.userName==="Admin"
                                            ? <div className="Route-wrapper">
                                            <NavLink to={"/addProduct"} className='Link'>Add new product</NavLink>
                                            <NavLink to={"/deleteProduct"} className='Link'>Delete product</NavLink>
                                            </div>
                                            : null}
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
                                    <div className="Body">
                                        <Form
                                            category_list={this.props.category_list}
                                            onClick={this.props.addProduct}/>
                                    </div>
                                );
                            }
                        }
                    />

                    <Route path="/deleteProduct" render={
                            () => {
                                return(
                                    <div className="Body">
                                        <Form2 onClick={this.props.deleteProduct}/>
                                    </div>
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
                                        deleteOneProduct={this.props.deleteOneProduct}
                                        isAuth={this.props.isAuth}
                                        userName={this.props.userName}
                                        history={this.props.history}
                                        /> 
                                            
                                )
                            }  
                        }
                    />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} /> 
                    <Route path="/profile" render={
                            () => {
                                return(
                                    <Profile userName={this.props.userName} history={this.props.history}/>
                                );
                            }

                        } />
                </Switch>
            </div>
        );
    }
}
export default withRouter(Body);