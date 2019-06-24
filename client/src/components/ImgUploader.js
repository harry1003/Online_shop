// modify from https://codesandbox.io/s/9lzmzykjkr
import React, { Component } from "react";

class ImgUploader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            url: null,
            file: null 
        };
    }

    onChange = (event) => {
        const file = event.target.files[0];
        this.setState(
            (state) => {
                state.url = URL.createObjectURL(file);
                state.file = file;
                return state;
            }
        );
    }

    render(){
        return(
          <div>
            <input type="file" onChange={this.onChange} />
            <img style={{ width: "100%" }} src={this.state.url} />
          </div>
        );
    }
}

export default ImgUploader;