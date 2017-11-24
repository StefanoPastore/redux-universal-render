import { Component, PropTypes } from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncActionCreator } from './actions';

class Test extends Component {
  static propTypes = {
    asyncAction: PropTypes.func.isRequired,
    async: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    if (this.props.async) {
      this.props.asyncAction();
    }
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  dispatch => ({
    asyncAction: () => dispatch(asyncActionCreator()),
  }),
)(Test);
