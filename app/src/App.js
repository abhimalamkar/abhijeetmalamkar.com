import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';
import Header from './components/header/Header'
import Menu from './components/Menu'
import NavigationBar  from './components/NavigationBar'

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavigationBar />
        {/* <Menu /> */}
        <Header />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Abhijeet Malamkar</p>
          <a
            className="App-link"
            href="https://github.com/abhimalamkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
