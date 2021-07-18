import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import Home from './Home';
import SearchPortal from './searchPortal/SearchPortal';
import PolicyVisualiser from './policyVisualiser/PolicyVisualiser';

const { Header } = Layout;

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMenu: 'home',
      selectedComponent: <Home/>
    }
  }

  getComponent = (menu) => {
    let updatedSelectedComponent;

    switch(menu) {
      case 'home':
        updatedSelectedComponent = <Home/>
        break;
      case 'searchPortal':
        updatedSelectedComponent = <SearchPortal/>
        break;
      case 'policyVisualiser':
        updatedSelectedComponent = <PolicyVisualiser/>
        break;
      default:
        updatedSelectedComponent = null;
    }

    return updatedSelectedComponent;
  }

  onChangeMenu = (menu) => {
    let updatedSelectedComponent = this.getComponent(menu.key);

    this.setState({ selectedComponent: updatedSelectedComponent, currentMenu: menu.key, });
  }

  render() {
    const { selectedComponent } = this.state

    return (
      <React.Fragment>
        <Layout className='layout'>
          <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ fontSize: 15 }}>
            <Menu.Item key="home" onClick={this.onChangeMenu}>INSURANCE POLICY APPLICATION</Menu.Item>
            <Menu.Item key="searchPortal" onClick={this.onChangeMenu}>Search Portal</Menu.Item>
            <Menu.Item key="policyVisualiser" onClick={this.onChangeMenu}>Policy Visualiser </Menu.Item>
          </Menu>
        </Header>
        </Layout>
        {selectedComponent}
      </React.Fragment>
    );
  }
}

export default LandingPage;
