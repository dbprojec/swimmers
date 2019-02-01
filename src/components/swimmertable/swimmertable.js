import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import Home from './pages/home/home';
import _AppBar from './components/appbar/AppBar'
import HttpUtil from '../..//utils/http.util';
class SwimmerTable extends Component {

    httpUtil = null;
    constructor() {
        this.httpUtil = HttpUtil.getInstance()
        this.fetchContent = this.fetchContent.bind(this)
    }

    fetchContent = () => {
        this.httpUtil.
    }

  render() {
    return (
      <div></div>
    );
  }
}

export default SwimmerTable;
