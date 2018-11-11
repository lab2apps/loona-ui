import React from 'react';
import {
  HeaderButton, IOS,
  PanelHeader, platform,
} from '@vkontakte/vkui';
import { RoomDetails } from '../../rooms/room-details/RoomDetails';
import { connect } from 'react-redux';
import type { RootState } from '../../../store/reducers/rootReducer';
import { bindActionCreators } from 'redux';
import { getRoom } from '../../../store/actions/roomActions';
import { withRouter } from 'react-router-dom';
import querystring from 'query-string';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

type RoomDetailsProps = {}

const osname = platform();


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
        <PanelHeader addon={<HeaderButton onClick={this.props.history.goBack}>Отменить</HeaderButton>}
                     left={
                       <HeaderButton onClick={this.props.history.goBack}>{
                         osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                       </HeaderButton>
                     }>
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
