import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import Home from './pages/home/home';
import _AppBar from './components/appbar/AppBar'
class App extends Component {
  render() {
    return (
      <Home />
    );
  }
}

export default App;
