import { Children } from 'react';

const walkComponentTree = (element, context) => {
  let children = null;
  let nextContext = context;

  if (typeof element.type === 'function') {
    const Component = element.type;
    const props = { ...Component.defaultProps, ...element.props };

    // Is this a class component? (http://bit.ly/2j9Ifk3)
    const isReactClassComponent =
      Component.prototype &&
      (Component.prototype.isReactComponent ||
        Component.prototype.isPureReactComponent);

    if (isReactClassComponent) {
      const instance = new Component(props, context);

      // In case the user doesn't pass these to super in the constructor
      instance.props = instance.props || props;
      instance.context = instance.context || context;

      // Make the setState synchronous.
      instance.setState = newState => {
        instance.state = { ...instance.state, ...newState };
      };

      if (instance.componentWillMount) {
        instance.componentWillMount();
      }

      children = instance.render();

      nextContext = instance.getChildContext
      ? { ...context, ...instance.getChildContext() }
      : context;
    } else {
      children = element.type(props, context);
    }
  } else {
    children = element.props && element.props.children
      ? element.props.children
      : undefined;
  }

  if (children && Children.count(children)) {
    Children.map(children, (cur) => {
      walkComponentTree(cur, nextContext);
    });
  }
};

export default walkComponentTree;
