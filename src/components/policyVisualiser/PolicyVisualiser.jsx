import React, { Component } from 'react';
import { Card, Radio, Select } from 'antd';

import Header from '../common/Header';
import ChartVisualiser from './ChartVisualiser';
import Datasource from '../../datasource/index.js'
import LoadingSpinner from './LoadingSpinner';

const { Option } = Select;
const datasource = new Datasource()

const MONTHS = ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12']
const REGIONS = ['North', 'South', 'East', 'West'];
const CHARTS = [ 'bar', 'line', 'scatter'];

class PolicyVisualiser extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      filter: 'monthly',
      subFilter: '2018-1',
      policies: {},
      chartType: 'bar',
      loading: false,
    };
  };

  async componentDidMount() {
    await this.filterPoliciesByQuery()
  };
  
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.subFilter !== this.state.subFilter) {
      await this.filterPoliciesByQuery()
    }
  }

  filterPoliciesByQuery = async () => {
    this.setState({ policies: {}, loading: true })
    const { filter, subFilter } = this.state
    const policies = await datasource.filterPolicies(filter, subFilter)
    this.setState({ policies, loading: false })
  }
  
  onChangeFilter = (event) => {
    const filter = event.target.value
    const subFilter = filter === 'monthly' ? '2018-1' : 'North';
    this.setState({ filter, subFilter });
  }

  onChangeSubFilter = (subFilter) => {
    this.setState({ subFilter });
  }

  onChangeChartType = (chartType) => {
    this.setState({ chartType })
  }

  renderHeader = () => {
    return <Header title='POLICY VISUALISER' />
  }

  renderMonths = () => {
    const monthsContent = MONTHS.map(month => <Option value={month} key={month}>{month}</Option>)

    return (
      <Select defaultValue="2018-01" style={{ width: 120 }} onChange={this.onChangeSubFilter} className='months-dropdown'>
        {monthsContent}
      </Select>
    )
  }

  renderRegions = () => {
    const regionsContent = REGIONS.map(region => <Option value={region} key={region}>{region}</Option>)

    return (
      <Select defaultValue="North" style={{ width: 120 }} onChange={this.onChangeSubFilter} className='region-dropdown'>
        {regionsContent}
      </Select>
    )
  }

  renderChartTypes = () => {
    const chartContent = CHARTS.map(chart => <Option value={chart} key={chart}>{chart}</Option>)

    return (
      <Select defaultValue="bar" style={{ width: 120 }} onChange={this.onChangeChartType} className='chart-dropdown'>
        {chartContent}
      </Select>
    )
  }

  renderFunctionalities = () => {
    const { filter } = this.state

    return (
      <div className='chart-filters'>
        <Radio.Group onChange={this.onChangeFilter} defaultValue="monthly">
          <Radio.Button value="monthly">Monthly</Radio.Button>
          <Radio.Button value="region">Region</Radio.Button>
          {/* {filter == 'monthly' ? this.renderMonths() : this.renderRegions()} */}
        </Radio.Group>
        {filter === 'monthly' && this.renderMonths()}
        {filter === 'region' && this.renderRegions()}
        {this.renderChartTypes()}
      </div> 
    )
  }

  render() {
    const { policies, chartType } = this.state

    return (
      <div className='policy-visualiser-container'>
        <Card style={{ textAlign: 'center', paddingTop: '30px' }} >
          {this.renderHeader()}
          {this.renderFunctionalities()}
          {this.state.loading && <LoadingSpinner/>}
          <ChartVisualiser policies={policies} chartType={chartType}/>
        </Card>
      </div>
    );
  }
}
 
export default PolicyVisualiser;