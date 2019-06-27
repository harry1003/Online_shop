import React, { Component } from 'react';
import url from "../../config"
import AuthHelper from "./AuthHelper"

export default function withAuth(AuthComponent) {

    return class Auth extends Component {
        constructor(props){
            super(props);
            this.state = {
                isAuth: false,
                userName: ""
            }
            
        }
        componentWillMount = async () => {
            if (AuthHelper.checkIfLogin()){
                try {
                    const token = localStorage.getItem('bookToken')
                    const user = await AuthHelper.getUserName(token)
                    this.setState({
                        isAuth: true,
                        userName: user.data
                    })
                }
                catch (err) {
                    console.log("Something wrong when getting token.")
                }
            }
        }

        

        render() {
            return (
                <AuthComponent isAuth={this.state.isAuth} userName={this.state.userName} />
            )
        }
    }
}