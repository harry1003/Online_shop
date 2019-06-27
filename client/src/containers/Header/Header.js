import React, { Component } from "react";
import { NavLink }  from "react-router-dom";
import './Header.css'
import logo from "../../resource/H.png";

class Header extends Component {
    logout = () => {
        localStorage.removeItem('bookToken');
        window.location.reload();
    }

    render() {
        let Item = "Item-buy";
        Object.keys(this.props.shop_list).some(
            (item) => {
                if(this.props.shop_list[item] > 0){
                    Item = Item + " Visible";
                    return true;
                }
            }
        )
        //console.log(this.props.userName)
        let greeting = ''
        let profile = ''
        if (this.props.isAuth){
            greeting = 'Hi ' + this.props.userName
            profile = <NavLink className="Button" to="/profile">Profile</NavLink>
        } 
        
        return(
            <div className="Header">
                <div className="Blog_logo_name">
                    <img className="Logo" src={logo}/>
                    <div className="Line"></div>
                    <h1 className="Name">books shop</h1>
                </div>
                <div className="Sign_in">
                    <div className="greeting">
                        {greeting}
                    </div>
                    <div className="Button-wrapper">
                        <NavLink className="Button-black" to="/">Home</NavLink>
                    </div> 
                    {this.props.isAuth
                    ? <div className="Button" onClick={this.logout}>
                        Sign out
                        </div>
                    : <NavLink className="Button" to="/login">
                        Sign in
                        </NavLink>}
                    
                    <div className="Button-wrapper">
                        <NavLink className="Button-black" to={"/purchase"}>Purchase</NavLink>
                        <div className={Item}></div>
                    </div> 
                    <div>
                        {profile}
                    </div> 
                </div>
            </div>
        );
    }
}
export default Header;