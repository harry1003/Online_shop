// modify from https://codesandbox.io/s/9lzmzykjkr
import React, { Component } from "react";
import "./ImgUploader.css"

class ImgUploader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            url: null,
        };
    }

    onChange = (event) => {
        const file = event.target.files[0];
        this.setState(
            (state) => {
                state.url = URL.createObjectURL(file);
                return state;
            }
        );
    }

    render(){
        return(
          <div>
            <input className="Img_button" type="file" onChange={this.onChange} id="Img"/>
            <img className="Img" src={this.state.url}/>
          </div>
        );
    }
}

export default ImgUploader;