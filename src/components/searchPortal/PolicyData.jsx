import React, { Component } from 'react';
import { Button, Divider, Row, Col } from 'antd';

import Datasource from '../../datasource'
import Status from '../common/Status';
import EditPolicyModal from './EditPolicyModal';
import SearchResultSkeleton from './SearchResultSkeleton';

class PolicyData extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      policyData: {},
      showAlert: false,
      showSkeleton: false,
      viewModal: false,
    };

    this.datasource = new Datasource();
  };

  async componentDidUpdate(prevProps) {
    const { searchFilter, searchPhrase } = this.props

    if((prevProps.searchFilter != searchFilter) || (prevProps.searchPhrase != searchPhrase)) {
      this.setState({ showAlert: false, showSkeleton: true, policyData: {} })
      const policyData = await this.datasource.getPolicyData(searchFilter, searchPhrase)

      const updatedState = policyData ? { policyData } : { showAlert: true }
      this.setState({ ...updatedState, showSkeleton: false });
    }
  }

  onOpenModal = () => {
    this.setState({ viewModal: true })
  }

  onCloseModal = () => {
    this.setState({ viewModal: false })
  }

  onUpdatePolicyData = (policyData) => {
    this.setState({ policyData, viewModal: false })
  }

  renderUserColumn = (columnName, columnValue) => (
    <div className='column-container'>
      <div className='column-name'>{columnName}</div>
      <div className='column-value'>{columnValue}</div>
    </div>
  );

  renderPolicyDetails = () => {
    const { policyData } = this.state
    const { _id: policyId, dateOfPurchase, premium } = policyData;

    return (
      <React.Fragment>
        <Divider />
        <Row gutter={16}>
          <Col span={16}><span className='policy-sub-heading'>Policy Details</span></Col>
          <Col span={8}>
            <Button type="primary" onClick={this.onOpenModal}>Edit insurance policy</Button>
          </Col>
        </Row>
        {this.renderUserColumn('Policy Id', policyId)}
        {this.renderUserColumn('Date of Purchase', dateOfPurchase)}
        {this.renderUserColumn('Premium', premium)}
      </React.Fragment>
    )
  }

  renderCustomerDetails = () => {
    const { policyData } = this.state
    const { customerId, customerGender, customerIncomeGroup, customerRegion, customerMaritalStatus } = policyData;

    return (
      <React.Fragment>
        <div className='divider'/>
        <span className='policy-sub-heading'>Customer Details</span>
        {this.renderUserColumn('Customer Id', customerId)}
        {this.renderUserColumn('Customer Gender', customerGender)}
        {this.renderUserColumn('Customer Income group', customerIncomeGroup)}
        {this.renderUserColumn('Customer Region', customerRegion)}
        {this.renderUserColumn('Customer Marital Status', customerMaritalStatus ? 'Yes' : 'No')}
      </React.Fragment>
    )
  }

  renderVehicleDetails = () => {
    const { policyData } = this.state
    const { fuel, vehicleSegment } = policyData;

    return (
      <React.Fragment>
        <div className='divider'/>
        <span className='policy-sub-heading'>Vehicle Details</span>
        {this.renderUserColumn('Fuel', fuel)}
        {this.renderUserColumn('Vehicle Segment', vehicleSegment)}
      </React.Fragment>
    )
  }
  
  renderInsuranceCoverageDetails = () => {
    const { policyData } = this.state
    const { bodilyInjuryLiability, personalInjuryProtection, propertyDamageLiability, collision, comprehensive } = policyData;

    return (
      <React.Fragment>
        <div className='divider'/>
        <span className='policy-sub-heading'>Insurance Coverage Details</span>
        {this.renderUserColumn('Bodily Injury Liability', bodilyInjuryLiability ? 'Yes' : 'No')}
        {this.renderUserColumn('Personal Injury Protection', personalInjuryProtection ? 'Yes' : 'No')}
        {this.renderUserColumn('Property Damage Liability ', propertyDamageLiability ? 'Yes' : 'No')}
        {this.renderUserColumn('Collision ', collision ? 'Yes' : 'No')}
        {this.renderUserColumn('Comprehensive', comprehensive ? 'Yes' : 'No')}
      </React.Fragment>
    )
  }

  renderPolicyData = () => {
    return (
      <React.Fragment>
        {this.renderPolicyDetails()}
        {this.renderCustomerDetails()}
        {this.renderVehicleDetails()}
        {this.renderInsuranceCoverageDetails()}
      </React.Fragment>
    )
  }

  renderEditModal = () => {
    const { policyData } = this.state

    return (
      <EditPolicyModal
        onCloseModal={this.onCloseModal}
        policyData={policyData}
        datasource={this.datasource}
        onUpdatePolicyData={this.onUpdatePolicyData}
      />
    )
  }

  renderSkeleton = () => {
    return <SearchResultSkeleton/>;
  }

  renderStatus = () => {
    const { searchFilter, searchPhrase } = this.props
    return <Status type='error' message='Error' description={`Record not found for ${searchFilter} - ${searchPhrase}`} />
  }

  render() {
    const { showAlert, showSkeleton, viewModal, policyData } = this.state
    const { searchPhrase } = this.props
    const hasPolicyData = Object.keys(policyData).length > 0

    return (
      <div>
        {hasPolicyData && this.renderPolicyData()}
        {showSkeleton && this.renderSkeleton()}
        {showAlert && searchPhrase && this.renderStatus()}
        {viewModal && this.renderEditModal()}
      </div>
    );
  }
}
 
export default PolicyData;