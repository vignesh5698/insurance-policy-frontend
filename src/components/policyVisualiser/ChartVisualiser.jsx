import React, { Component } from 'react';
import Plot from 'react-plotly.js';

import { layoutConfig } from './chartConfigs.js';

class ChartVisualiser extends Component {
  getMode = (chartType) => {
    let mode = 'lines+markers'
    if(chartType === 'scatter') {
      mode = 'markers'
    }
    return mode;
  }

  getChartData = () => {
    const { policies, chartType } = this.props
    const mode = this.getMode(chartType);

    return [
      {
        x: policies.policyDates,
        y: policies.counts,
        type: chartType,
        mode: mode,
        name: 'Policies',
        line: {
          color: 'rgb(55, 128, 191)',
          width: 1
        },
      },
    ]
  }

  render() {    
    return (
      <Plot
        config={{ displayModeBar: false }}
        data={this.getChartData()}
        layout={ layoutConfig }
      />
    );
  }
}
 
export default ChartVisualiser;