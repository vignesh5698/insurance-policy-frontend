import React, { Component } from 'react';
import { Card, Image } from 'antd';

class Home extends Component {
  renderApplication = () => {
    return (
      <React.Fragment>
        <h2><b>Tech Stack Used:</b></h2>
        <h3><b>Backend:</b></h3>
        <h4>- Node.js</h4>
        <h4>- MongoDb</h4>

        <h3><b>Frontend:</b></h3>
        <h4>- React</h4>
        <h4>- Antd</h4>
        <h4>- Plotly.js</h4>

        <h2><b>Deployment:</b></h2>
        <h3><b>Backend:</b></h3>
        <h4>- Hosted in Amazon EC2</h4>
        - Sample Endpoints &nbsp;
        <code>
          <a href='http://3.138.140.199:5000/customer/400' target='_empty'>FindCustomerById</a> | <a href='http://3.138.140.199:5000/policy/12345' target='_empty'>FindPolicyById</a>
        </code>
        <br/><br/>
        <h3><b>Frontend:</b></h3>
        <h4>- Hosted in Netlify</h4>
      </React.Fragment>
    );
  }

  renderLogo = () => {
    return (
      <div className='logo'>
        <Image
          width={250}
          src={'https://www.spegcs.org/media/files/events/speaker/4321/boston_consulting_group_logo_monogram.png'}
          preview={false}
          loading="lazy"
        />
      </div>
    );
  }

  render() {
    return (
      <Card style={{ margin: '25px' }} >
        {this.renderLogo()}
        {this.renderApplication()}
      </Card>
    );
  }
}
 
export default Home;