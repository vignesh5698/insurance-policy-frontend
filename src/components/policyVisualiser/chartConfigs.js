const layoutConfig = {
  width: 1000,
  height: 650,
  showlegend: true,
  xaxis: {
    title: {
      text: 'Date ',
      font: { family: 'Courier New, monospace', size: 18, color: '#7f7f7f' }
    },
  },
  yaxis: {
    title: {
      text: 'Policies Count',
      font: { family: 'Courier New, monospace', size: 18, color: '#7f7f7f' }
    },
  }
}

module.exports = {
  layoutConfig
}