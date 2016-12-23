import React, { Component, PropTypes } from 'react';
import Clone from 'react-clone';

export default class ReactFetcher extends Component {
  static propTypes = {
    children: PropTypes.node,
    spinner: PropTypes.node,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    from: PropTypes.string.isRequired,
    as: PropTypes.string,
    parentProps: PropTypes.object,
    options: PropTypes.object,
    toJson: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    as: 'data',
    spinner: null,
    parentProps: {},
    options: {},
    toJson: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    const { toJson, from, onError, onSuccess: onSuccessCb, options } = this.props;

    const catchErrors = (r) => {
      if (r.ok) {
        return r;
      }

      throw Error(r.statusText);
    };
    const parseResponse = r => (toJson ? r.json() : r.blob());
    const onSuccess = (data) => {
      this.setState({ data, loading: false });

      if (typeof onSuccessCb === 'function') {
        onSuccessCb(data);
      }
    };
    const onCatch = (errorData) => {
      if (typeof onError === 'function') {
        onError(errorData);
      }

      console.error(errorData);
    };

    this.fetch = global.fetch(from, options)
      .then(catchErrors)
      .then(parseResponse)
      .then(onSuccess)
      .catch(onCatch);
  }

  getSpinner() {
    const { spinner = null } = this.props;
    const isValidElement = React.isValidElement(spinner);

    return isValidElement ? spinner : <span>{spinner}</span>;
  }

  render() {
    const { children, as, parentProps } = this.props;
    const { loading, data } = this.state;
    const props = { ...parentProps, [as]: data };
    const childrenIsReactFetcher = children.type === ReactFetcher;

    if (loading) {
      return this.getSpinner();
    }

    if (childrenIsReactFetcher) {
      return <Clone element={children} parentProps={props} />;
    }

    return <Clone element={children} {...props} />;
  }
}
