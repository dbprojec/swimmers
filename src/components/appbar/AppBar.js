import React from 'react'
import './AppBar.css'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
const {
  Header
} = Layout;

class _AppBar extends React.Component {
  render () {
    return (
      <Header className="header">
        Swimmers
      </Header>
    )
  }
}

export default _AppBar;
