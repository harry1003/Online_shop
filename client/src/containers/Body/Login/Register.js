import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const url = "http://localhost:3001/user/"

class Login extends Component {
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
    resetState = () => {
        this.setState({
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            errorMsg: ""
        })
    }
    handleInput = (e) => {
        //console.log(this.state.gender)
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    checkUserName = async () => {
        const body = JSON.stringify({
            userName: this.state.userName
        })
        const res = await fetch(url+"checkUserName", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        if (res.exists){
            this.setState({
                errorMsg: "Username has already existed!"
            })
        }
        else {
            this.setState({
                errorMsg: ""
            })
        }
    }

    register = async (e) => {
        if (this.state.errorMsg !== "") return
        if (!this.state.userName || !this.state.password) return
        const body = JSON.stringify({
            userName: this.state.userName,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            gender: this.state.gender,
        })
        const res = await fetch(url+"register", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        if (res.success) {
            this.props.history.push("/login");
        }
        else {
            this.setState({
                errorMsg:res.msg
            })
        }
    }
    render() {
        return (
            <div className="login-container">
                <h3>Welcome to register!</h3>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label for="username">Username: </Label>
                            <Input value={this.state.userName} type="text" name="userName" id="username" placeholder="..." onChange={e => this.handleInput(e)} onBlur={this.checkUserName} required />
                            <FormText color="danger">
                                {this.state.errorMsg}
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password: </Label>
                            <Input value={this.state.password} type="password" name="password" id="password" placeholder="..." onChange={e => this.handleInput(e)} required />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="firstname">First Name: </Label>
                            <Input value={this.state.firstName} type="firstname" name="firstName" id="firstname" placeholder="..." onChange={e => this.handleInput(e)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="lastname">Last Name: </Label>
                            <Input value={this.state.lastName} type="lastname" name="lastName" id="lastname" placeholder="..." onChange={e => this.handleInput(e)} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="phone">Phone: </Label>
                            <Input value={this.state.phone} type="phone" name="phone" id="phone" placeholder="..." onChange={e => this.handleInput(e)} />
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-2">Gender</legend>
                        <Col sm={10}>
                            <FormGroup check>
                                <Label check>
                                    <Input value="Male" type="radio" name="gender" onChange={e => this.handleInput(e)} />{' '}
                                    Male
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input value="Female" type="radio" name="gender" onChange={e => this.handleInput(e)} />{' '}
                                    Female
                                </Label>
                           </FormGroup>
                        </Col>
                        </FormGroup>
                    </Col>
                    <div className="login-btn">
                        <Button onClick={(e) => this.register(e)}>
                            Register    
                        </Button>
                        <Button onClick={this.resetState}>
                            Cancel  
                        </Button>
                    </div>
                    <br></br>
                    <FormText>
                        You will be redirected to login page if the registeration is successful!
                    </FormText>
                                 
                </Form>
            </div>
            
        )
    }
}

export default Login;