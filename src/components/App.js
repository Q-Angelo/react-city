import React, { Component } from 'react';
import City from './City';
import '../static/App.css';

class App extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
        data: '',
    };
  }
  handleCityChange = (value) => {
    console.log(value);
    this.setState({data: value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <City cityName='河南省 郑州市 金水区' callbackParent={this.handleCityChange} />

        <div className="demo-pre">
          {this.state.data.province} {this.state.data.city} {this.state.data.country}
        </div>
      </div>
    );
  }
}

export default App;
