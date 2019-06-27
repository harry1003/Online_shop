import React, { Component } from "react";
import url from "../../config";
import AuthHelper from "../Auth/AuthHelper";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            errorMsg: ""
        }
    }
    componentWillMount = () => {
        if (AuthHelper.checkIfLogin()){
            this.props.history.push("/")
        }
        const token = localStorage.getItem('bookToken');
        const userName = AuthHelper.getUserName(token);
        this.setState({
            userName: userName
        })

    }
    getUserData = async (userName) => {
        const body = JSON.stringify({userName:this.state.userName});
        const res = await fetch(url+"getUserData/"+userName).then(res => res.json())
        if (res.success) return res.data
        else {
            AuthHelper.logout()
            this.props.history.push("/")
        } 
    }
    render () {
        const userData = this.getUserData(this.state.userName)
        return (
            <div></div>
        )
    }
}

export default Profile