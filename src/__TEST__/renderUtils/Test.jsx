import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncAction } from './actions';

class Test extends Component {
  static propTypes = {
    asyncAction: PropTypes.func.isRequired,
    async: PropTypes.bool.isRequired,
  }

  async componentWillMount() {
    if (this.props.async) {
      await this.props.asyncAction();
    }
  }

  render() {
    return null;
  }
}

export default connect(
  null,
  {
    asyncAction,
  },
)(Test);
