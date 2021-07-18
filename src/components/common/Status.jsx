import React, { Component } from 'react';
import { Alert } from 'antd';


class Status extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showAlert: true
    };
  };

  componentDidUpdate(prevProps) {
    if(prevProps.message !== this.props.message) {
      this.setState({ showAlert: true });
      setTimeout(() => {
        this.setState({ showAlert: false })
      }, 2000);
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ showAlert: false })
    }, 2000);
  };
  

  render() {
    const { type, message, description } = this.props
    return (
      <div className='alert'>
        {this.state.showAlert && <Alert message={message} type={type} description={description} showIcon />}
      </div>
    );
  }
}

export default Status;