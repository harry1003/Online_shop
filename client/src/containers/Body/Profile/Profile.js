import React, { Component } from "react";
import url from "../../../config";
import AuthHelper from "../../Auth/AuthHelper";
import ImgUploader from '../../../components/ImgUploader';
import {Card, CardImg, CardHeader, CardBody, CardText, CardFooter, Button, Table} from "reactstrap";
import avatar from '../../../resource/default-avatar.jpg'
import './Profile.css'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {},
            photo: avatar
        }
    }

    componentWillMount = async () => {
        AuthHelper.checkIfLogin().then(isLogin => {
            if (!isLogin){
                this.props.history.push("/");
            }
        })
        if (this.props.userName.length !== 0){
            const userData = await this.getUserData(this.props.userName)
            if (this.state.userData.hasOwnProperty('img')){
                this.setState({
                    userData: userData,
                    photo: this.state.userData.img
                })
            }
            else {
                this.setState({
                    userData: userData
                })
            }
        }
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
        AuthHelper.checkIfLogin().then(isLogin => {
            if (!isLogin){
                this.props.history.push("/");
            }
        })
        let history
        console.log(Array.isArray(this.state.userData.history) && this.state.userData.history.length===0)
        if (this.state.userData.history === undefined || (Array.isArray(this.state.userData.history) && this.state.userData.history.length === 0)){
            history = <Card>
                        <CardHeader>Purchase History</CardHeader>
                        <CardBody>
                            <CardText>No History!</CardText>
                        </CardBody>
                        <CardFooter>Purchase History</CardFooter>
                    </Card>
        }
        else{
            history = this.state.userData.history.map(hist => {
                return (
                    <Card className="HistoryCard">
                        <CardHeader>Purchase History</CardHeader>
                        <CardBody>
                            {Object.keys(hist).map(key => {
                                return <CardText>{key}: {hist[key]}</CardText>
                                })}
                        </CardBody>
                        <CardFooter>Purchase History</CardFooter>
                    </Card> 
                )   
            })
        }

        return (
            <div className="ProfileContainer">
                <Card className="Card">
                    <CardImg className="cardImg" src={this.state.photo} alt="personal photo"/>
                    <Button>Upload Photo</Button>
                </Card>
                <Table striped className="Profile">
                    <tbody>
                        <tr>
                            <td>Username: </td>
                            <td>{this.state.userData.userName}</td>
                        </tr>
                        <tr>
                            <td>First Name: </td>
                            <td>{this.state.userData.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name: </td>
                            <td>{this.state.userData.lastName}</td>
                        </tr>
                        <tr>
                            <td>Phone: </td>
                            <td>{this.state.userData.phone}</td>
                        </tr>
                        <tr>
                            <td>Gender: </td>
                            <td>{this.state.userData.gender}</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="HistoryContainer">
                    <h3>Purchase History</h3>
                    {history}
                </div>
            </div>
        )
    }
}
export default Profile