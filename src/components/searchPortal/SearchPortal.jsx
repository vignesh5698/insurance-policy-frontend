import React, { Component } from 'react';
import { Card } from 'antd';

import Header from '../common/Header';
import SearchBarContainer from './SearchBarContainer';
import PolicyData from './PolicyData';

class SearchPortal extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      searchFilter: '',
      searchPhrase: '',
    };
  };

  onChangeSearchPhrase = (searchConfig) => {
    const { searchFilter, searchPhrase } = searchConfig
    this.setState({ searchFilter, searchPhrase });
  }

  renderHeader = () => {
    return <Header title='POLICY SEARCH PORTAL' />
  }

  renderSearchBarContainer = () => {
    return <SearchBarContainer onChangeSearchPhrase={this.onChangeSearchPhrase} />
  }

  renderPolicyData = () => {
    const { searchFilter, searchPhrase } = this.state

    return <PolicyData searchFilter={searchFilter} searchPhrase={searchPhrase} />
  }

  render() {
    return (
      <div className='body-container'>
        <Card style={{ textAlign: 'center', paddingTop: '30px' }} >
          {this.renderHeader()}
          {this.renderSearchBarContainer()}
          {this.renderPolicyData()}
        </Card>
      </div>
    );
  }
}
 
export default SearchPortal;