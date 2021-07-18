import React, { Component } from 'react';
import { Modal, Button, Select, InputNumber } from 'antd';

const { Option } = Select;

class EditPolicyModal extends Component {
  constructor(props) {
    super(props)
    const { policyData } = props;

    this.state = {
      confirmLoading: false,
      ...policyData
    };
  };

  handleUpdate = () => {
    const { _id } = this.state
    const { datasource, onUpdatePolicyData } = this.props
    this.setState({ confirmLoading: true })

    datasource.updatePolicy(_id, {...this.state})
      .then((res) => {
        this.setState({ confirmLoading: false })
        onUpdatePolicyData(res);  
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = (policyValue, policyName) => {
    this.setState(prevState => {
      return {
        ...prevState,
        [policyName]: policyValue
      }
    })
  }

  renderPolicyHeader = (columnName) => (
    <div className='column-container'>
      <div className='column-name'>{columnName}</div>
    </div>
  );

  renderPremiumInput = (premium) => {
    return (
      <div>
        {this.renderPolicyHeader('Premium')}
        <InputNumber min={1} max={1000000} defaultValue={premium} onChange={(premium) => this.handleInputChange(premium, 'premium')} />
      </div>
    )
  }

  renderCustomerRegion = (customerRegion) => {
    const options = ['North', 'South', 'East', 'West'].map(region =>
      <Option value={region} key={region}>{region}</Option>);

    return (
      <div className='policy-edit-submenu'>
        {this.renderPolicyHeader('Customer Region')}
        <Select defaultValue={customerRegion} style={{ width: 120 }} onChange={(region) => this.handleInputChange(region, 'customerRegion')}>
          {options}
        </Select>
      </div>
    )
  }

  renderModalContents = () => {
    const {
      premium,
      customerMaritalStatus,
      customerRegion,
      bodilyInjuryLiability,
      personalInjuryProtection,
      propertyDamageLiability,
      collision,
      comprehensive
    } = this.state;

    return (
      <div>
        {this.renderPremiumInput(premium)}
        {this.renderCustomerRegion(customerRegion)}
        {this.renderGenericPolicySelect(customerMaritalStatus, [0, 1], 'customerMaritalStatus', 'Customer Marital Status')}
        {this.renderGenericPolicySelect(bodilyInjuryLiability, [0, 1], 'bodilyInjuryLiability', 'Bodily Injury Liability')}
        {this.renderGenericPolicySelect(personalInjuryProtection, [0, 1], 'personalInjuryProtection', 'Personal Injury Protection')}
        {this.renderGenericPolicySelect(propertyDamageLiability, [0, 1], 'propertyDamageLiability', 'Property Damage Liability')}
        {this.renderGenericPolicySelect(collision, [0, 1], 'collision', 'Collision')}
        {this.renderGenericPolicySelect(comprehensive, [0, 1], 'comprehensive', 'Comprehensive')}
      </div>
    )
  }

  renderOptions = (options) => {
    const optionsContent = options.map((option) => 
      <Option value={option} key={option}>{option ? 'Yes' : 'No'}</Option>);

    return optionsContent;
  }

  renderGenericPolicySelect = (defaultValue, options, policyName, policyValue) => {
    return (
      <div className='policy-edit-submenu'>
        {this.renderPolicyHeader(policyValue)}
        <Select
          defaultValue={defaultValue ? 'Yes' : 'No'}
          style={{ width: 120 }}
          onChange={(e) => this.handleInputChange(e, policyName)}
        >
          {this.renderOptions(options)}
        </Select>
      </div>
    )
  }

  renderFooterButtons = (confirmLoading) => [
    <Button key="back" onClick={this.props.onCloseModal}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleUpdate}>
      Update Policy
    </Button>
  ]

  render() {
    const { confirmLoading } = this.state

    return (
      <div>
        <Modal
          title="Edit Insurance Policy"
          visible={true}
          onOk={this.handleUpdate}
          onCancel={this.props.onCloseModal}
          confirmLoading={confirmLoading} 
          footer={this.renderFooterButtons(confirmLoading)}
          >
          {this.renderModalContents()}
        </Modal>
      </div>
    );
  }
}
 
export default EditPolicyModal;
