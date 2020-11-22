import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null})
        return request;
      })
      this.responseInterceptor = axios.interceptors.response.use(res=>res, (error) => {
        this.setState({error: error});
        return Promise.reject(error);
      });
    }

    componentWillUnmount() {
      // this.requestInterceptor.request.eject(this.requestInterceptor);
      // this.responseInterceptor.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  };
}

export default withErrorHandler;