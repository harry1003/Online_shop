import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Col } from 'reactstrap';
import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import url from '../../../config';
import AuthHelper from '../../Auth/AuthHelper'

//const url = "http://localhost:3001/user/"

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            errorMsg: "",
            noUserInput: ""
        }
    }
    resetState = () => {
        this.setState({
            userName: "",
            password: "",
            errorMsg: ""
        })
    }

    handleInput = (e) => {
        console.log(this.state.userName)
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    login = async () => {
        if (!this.state.userName || !this.state.password) return
        const body = JSON.stringify({userName:this.state.userName, password:this.state.password});
        console.log(body)
        const res = await fetch(url+"login", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        console.log(res)
        if (res.success){
            localStorage.setItem('bookToken', res.token)
            console.log(localStorage.getItem('bookToken'))
            window.location.reload();
            
        }
        else {
            this.setState({
                errorMsg: res.msg
            })
        }
        
    }

    render() {
        AuthHelper.checkIfLogin().then(isLogin => {
            if (isLogin){
                this.props.history.push("/");
            }
        })
        
        return (
            <div className="login-container">
                <h3 className="title">Welcome to login!</h3>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label className="subtitle" for="userName">Username: </Label>
                            <Input value={this.state.userName} type="text" name="userName" id="userName" required placeholder="Username..." onChange={e => this.handleInput(e)} />
                        </FormGroup>
                        <FormText color="danger">
                            {this.state.noUserInput}
                        </FormText>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label className="subtitle" for="password">Password: </Label>
                            <Input value={this.state.password} type="password" name="password" id="password" required="required" placeholder="Password..." onChange={e => this.handleInput(e)} />
                            <FormText color="danger">
                                {this.state.errorMsg}
                            </FormText>
                        </FormGroup>
                    </Col>
                    <div className="login-btn">
                        <Button onClick={(e) => this.login(e)}>
                            Login    
                        </Button>
                        <Button>
                            <NavLink className="normal-btn" to="/register">Register</NavLink>    
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Login;