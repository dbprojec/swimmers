import React from 'react'
import { Layout, Menu } from 'antd';
import SwimmerTable from '../../components/swimmertable/swimmertable';
import _AppBar from '../../components/appbar/AppBar';
const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;

class Home extends React.Component {
  render () {
    return (
      <Layout>
        <_AppBar />
        <SwimmerTable />
      </Layout>
    )
  }
}

export default Home;
