import React from 'react';
import {
  Div, Button,
} from '@vkontakte/vkui';
import { RoomsList } from '../../rooms/rooms-list/RoomsList';
import { removeSpace } from '../../../store/actions/spaceActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

type SpaceDetailsProps = {
  space: any;
}

@connect(null, mapDispatchToProps)
export class SpaceDetails extends React.PureComponent<SpaceDetailsProps> {
  remove = () => {
    this.props.removeSpace(this.props.space.uuid);
  };

  render () {
    return (
      <React.Fragment>
        <Div>
          Детали площадки
        </Div>

        <pre>
          { JSON.stringify(this.props.space, null, 2) }
        </pre>

        <Button onClick={ this.remove }>
          удалить
        </Button>

        <RoomsList>
        </RoomsList>
      </React.Fragment>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators({ removeSpace }, dispatch);
}
