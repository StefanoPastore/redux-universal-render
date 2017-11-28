import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import walkComponentTree from '../walkComponentTree';
import configurestore from './renderUtils/store';

const Test = ({ onRender }) => {
  if (onRender) onRender();
  return (<div></div>);
};
Test.propTypes = { onRender: PropTypes.func };

const StateLessComponent = ({ onRender }) => (
  <div>
    <p>adfsdsdfsdfdsf</p>
    <Test onRender={onRender} />
  </div>
);
StateLessComponent.propTypes = { onRender: PropTypes.func };

class WithWillMount extends Component {
  static propTypes = {
    onComponentWillMount: PropTypes.func,
  }

  componentWillMount() {
    const { onComponentWillMount } = this.props;
    onComponentWillMount();
    this.setState();
  }

  render() {
    return null;
  }
}

const NestedComponents = ({ onRender }) => (
  <StateLessComponent onRender={onRender} />
);
NestedComponents.propTypes = { onRender: PropTypes.func };

describe('walkComponentTree', () => {
  it('should call componentWillMount and setState', () => {
    const store = configurestore();

    const onComponentWillMount = jest.fn();
    const render = (<Provider store={store}>
      <WithWillMount onComponentWillMount={onComponentWillMount} />
    </Provider>);
    walkComponentTree(render);
    expect(onComponentWillMount).toHaveBeenCalled();
  });

  it('should call render of nested components', () => {
    const onRender = jest.fn();
    const render = <NestedComponents onRender={onRender} />;
    walkComponentTree(render);
    expect(onRender).toHaveBeenCalled();
  });
});
