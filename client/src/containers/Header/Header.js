import React, { Component } from "react";
import { NavLink }  from "react-router-dom";
import './Header.css'
import logo from "../../resource/H.png";

class Header extends Component {
    render() {
        let Item = "Item-buy";
        if(Object.keys(this.props.shop_list).length > 0){
            Item = Item + " Visible";
        }

        return(
        <div className="Header">
            <div className="Blog_logo_name">
                <img className="Logo" src={logo}/>
                <div className="Line"></div>
                <h1 className="Name">books shop</h1>
            </div>
            <div className="Sign_in">
                <div className="Button">Sign in</div>
                <div className="Button-wrapper">
                    <NavLink className="Button-black" to={"/purchase"}>Purchase</NavLink>
                    <div className={Item}></div>
                </div>  
            </div>
        </div>
        );
    }
}
export default Header;