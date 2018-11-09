import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { RootState } from '../../../store/reducers/rootReducer';

import { getUserInfo } from '../../../store/actions/vkActions';

import './main.scss';

@connect(mapStateToProps, mapDispatchToProps)
export class Main extends React.PureComponent {
  componentDidMount () {
    this.props.getUserInfo();
  }

  render () {
    return (
      <div className='l-main'>
        Main

        { this.props.user.id }
      </div>
    );
  }
}

function mapStateToProps (state: RootState) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getUserInfo,
  }, dispatch);
}
