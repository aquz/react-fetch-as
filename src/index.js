import React, { Component, PropTypes } from 'react';
import Clone from 'react-clone';

export default class ReactFetcher extends Component {
  static propTypes = {
    children: PropTypes.node,
    spinner: PropTypes.node,
    onError: PropTypes.func,
    from: PropTypes.string.isRequired,
    as: PropTypes.string,
    parentProps: PropTypes.object,
    toJson: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    as: 'data',
    spinner: null,
    parentProps: {},
    toJson: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      errorData: null,
    }
  }

  componentDidMount() {
    const { toJson, from } = this.props;

    const catchErrors = r => {
      if (r.ok) {
        return r;
      }

      throw Error(r.statusText);
    };
    const parseResponse = r => toJson ? r.json() : r.blob();
    const success = data => this.setState({data, loading: false});
    const onError = errorData => this.setState({errorData, loading: false}) && console.error(errorData);

    fetch(from)
      .then(catchErrors)
      .then(parseResponse)
      .then(success)
      .catch(onError);
  }

  getSpinner() {
    const { spinner = null} = this.props
    const isValidElement = React.isValidElement(spinner);

    return isValidElement ? spinner : <span>{spinner}</span>
  }

  render() {
    const { children, as, parentProps, onError } = this.props;
    const { loading, data, errorData } = this.state;
    const props = {...parentProps, [as]: data};
    const childrenIsNextLoad = children.type.prototype instanceof Load;

    if (loading) {
      return this.getSpinner();
    }

    if (errorData) {
      if (typeof onError === 'function') {
        console.log(errorData)
        return onError(errorData)
      }

      return null;
    }

    if (childrenIsNextLoad) {
      return <Clone element={children} parentProps={props}/>
    }

    return <Clone element={children} {...props}/>
  }
}
