import React, { Component } from "react";
import './Form.css'

class Form extends Component {
    render() {
        return (
            <div className="Container">
                <form name="add_product" className="Form">
                    <a className="Discription">id: </a><input className="Input" type="number" id="id"/><br/>
                    <a className="Discription">name: </a><input className="Input" type="text" id="name"/><br/>
                    <a className="Discription">author: </a><input className="Input" type="text" id="author"/><br/>
                    <a className="Discription">category: </a>
                    <select className="Input" id="category">
                        {
                            this.props.category_list.map(
                                (item) => {
                                    if(item !== 'All')
                                        return <option>{item}</option>
                                }
                            )
                        }
                    </select><br/>
                    <a className="Discription">language: </a><input className="Input" type="text" id="language"/><br/>

                    <a className="Discription">price: </a><input className="Input" type="number" id="price"/><br/>
                    <a className="Discription">year: </a><input className="Input" type="number" id="year"/><br/>
                    <a className="Discription">capacity: </a><input className="Input" type="number" id="capacity"/><br/>

                    <br/>
                    <a className="Discription">url and img, please choose one to submit </a><br/>
                    {"url: "} <input className="Url" type="text" id="url"/>
                    {/* {"  img: "} <input className="Input" type="file" id="img"/>*/}
                    <br/>
                    <p className="Discription">overview: </p><textarea cols="50" rows="5" className="Overview" type="text" id="overview"/><br/>

                   
                    <input className="Input" type='button' name='submit' value='Add' onClick={this.props.onClick}/>
                </form>
            </div>
        );
    }
}

class Form2 extends Component {
    render() {
        return (
            <div className="Container">
                <form name="delete_product" className="Form">
                    <a className="Discription">name: </a><input className="Input" type="text" id="name"/><br/>
                    <input className="Input" type='button' name='submit' value='Delete' onClick={this.props.onClick}/>
                </form>
            </div>
        );
    }
}
export {Form, Form2};