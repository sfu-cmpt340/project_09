import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    selectedFile: null
  }
 
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    // insert the firebase url below!
    axios.post('#INSERT URL HERE', fd, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%');
      }
    })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="uploadButtons">
          <input type="file" onChange={this.fileSelectedHandler}/>
          <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
      </div>
    );
  }
}

export default App;