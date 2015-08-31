import React from 'react';
import {connect } from 'react-redux';
import { clearWarning } from '../actions/actions';
import Warning from '../components/Warning';

class WarningContainer extends React.Component {

  render() {
    return (
      <Warning {...this.props} />
    );
  }

}

function mapStateToProps(state){
  return {
    warning: state.warning 
  };
}

function mergeProps(stateProps, dispatchProps, parentProps){
  const { warning } = stateProps;
  return Object.assign({}, parentProps, {
    clearWarning: () => dispatchProps.clearWarning(),
    warning
  });
}

export default connect(
  mapStateToProps,
  { clearWarning },
  mergeProps
)(WarningContainer);

