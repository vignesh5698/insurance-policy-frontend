import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { UserOutlined, BookOutlined } from '@ant-design/icons';

class SearchBarContainer extends Component {
  state = {
    currentSearchFilter: null,
    customerId: '',
    policyId: ''
  }

  onChangeInput = (event) => {
    const upcomingSearchFilter = event.target.name;
    const upcomingSearchPhrase = event.target.value;

    const { currentSearchFilter } = this.state
    let updatedState = {}

    if(currentSearchFilter !== upcomingSearchFilter) {
      updatedState = {
        customerId: '',
        policyId: '',
        currentSearchFilter: upcomingSearchFilter,
        [upcomingSearchFilter]: upcomingSearchPhrase
      }
    } else {
      updatedState = {[upcomingSearchFilter]: upcomingSearchPhrase }
    }

    this.setState({...updatedState});
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.handlePolicySearch();
    }
  }

  handlePolicySearch = () => {
    const searchFilter = this.state.currentSearchFilter;
    const searchPhrase = this.state[searchFilter];

    this.setState({
      currentSearchFilter: null,
      customerId: '',
      policyId: '',
    });

    this.props.onChangeSearchPhrase({ searchFilter, searchPhrase });
  }

  renderInputForm = () => {
    const { customerId, policyId } = this.state

    return (
      <Input.Group >
        <Row gutter={16}>
          <Col span={12}>
            {this.renderUserColumn('Customer Id', '')}
            <Input
              size="large"
              placeholder="Enter Customer ID"
              prefix={<UserOutlined />}
              className='input-placeholder'
              name='customerId'
              onChange={this.onChangeInput}
              value={customerId}
              onKeyPress={this.handleKeyPress}
            />
          </Col>
          <Col span={12}>
            {this.renderUserColumn('Policy Id', '')}
            <Input
              size="large"
              placeholder="Enter Policy ID"
              prefix={<BookOutlined />}
              className='input-placeholder'
              name='policyId'
              onChange={this.onChangeInput}
              value={policyId}
              onKeyPress={this.handleKeyPress}
            />
          </Col>
        </Row>
      </Input.Group>
    )
  }

  renderUserColumn = (columnName, columnValue) => (
    <div className='column-container'>
      <div className='column-name'>{columnName}</div>
      <div className='column-value'>{columnValue}</div>
    </div>
  );

  renderFormFooter = () => {
    return (
      <Row>
        <Col span={16} className='total-users'>
          {this.renderUserColumn('Total Insurance Policies', 1200)}
        </Col>
        <Col span={8} className='find-user-button'>
          <Button type="primary"  onClick={this.handlePolicySearch}>
            Search
          </Button>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div className='search-bar-container'>
        {this.renderInputForm()}
        {this.renderFormFooter()}
      </div>
    );
  }
}
 
export default SearchBarContainer;