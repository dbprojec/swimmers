import React from 'react'
import './AppBar.css'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;

class Home extends React.Component {
  render () {
    const {children} = this.props.children
    return (
      <Layout>
        {children}
      </Layout>
    )
  }
}

export default Home;
