import React from 'react';
import {
  PanelHeader,
} from '@vkontakte/vkui';
import { RoomDetails } from '../../rooms/room-details/RoomDetails';
import { connect } from 'react-redux';
import type { RootState } from '../../../store/reducers/rootReducer';
import { bindActionCreators } from 'redux';
import { getRoom } from '../../../store/actions/roomActions';
import { withRouter } from 'react-router-dom';
import querystring from 'query-string';

type RoomDetailsProps = {}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class Room extends React.PureComponent<RoomDetailsProps> {
  get roomId () {
    return querystring.parse(this.props.location.search).id;
  }

  componentDidMount () {
    this.props.getRoom(this.roomId);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Детали места
        </PanelHeader>

        { !this.props.fetching && this.props.room && <RoomDetails room={ this.props.room }/> }
      </React.Fragment>
    );
  }
}

function mapStateToProps (state: RootState) {
  return state.room;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getRoom,
  }, dispatch);
}
