import React, { Component } from "react";
import './Form.css';
import ImgUploader from '../../components/ImgUploader';

class Form extends Component {
    render() {
        return (
            <div className="Container">
                <form name="add_product" className="Form">
                    <q className="Discription">id: </q><input className="Input" type="text" id="id"/><br/>
                    <q className="Discription">name: </q><input className="Input" type="text" id="name"/><br/>
                    <q className="Discription">author: </q><input className="Input" type="text" id="author"/><br/>
                    <q className="Discription">category: </q>
                    <select className="Input" id="category">
                        {
                            this.props.category_list.map(
                                (item) => {
                                    if(item !== 'All')
                                        return <option key={item}>{item}</option>
                                }
                            )
                        }
                    </select><br/>
                    <q className="Discription">language: </q><input className="Input" type="text" id="language"/><br/>

                    <q className="Discription">price: </q><input className="Input" type="number" id="price"/><br/>
                    <q className="Discription">year: </q><input className="Input" type="number" id="year"/><br/>
                    <q className="Discription">capacity: </q><input className="Input" type="number" id="capacity"/><br/>

                    <br/>
                    <q className="Discription">url and img, please choose one to submit </q><br/>
                    {"url: "} <input className="Url" type="text" id="url"/>
                    <ImgUploader/>
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
                    <q className="Discription">name: </q><input className="Input" type="text" id="name"/><br/>
                    <input className="Input" type='button' name='submit' value='Delete' onClick={this.props.onClick}/>
                </form>
            </div>
        );
    }
}
export {Form, Form2};