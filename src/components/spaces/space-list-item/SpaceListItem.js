import React from 'react';
import {
  Cell,
  Avatar,
} from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';
import { environment } from '../../../config/environment';

type SpaceData = {
  id: string,
  name: string,
}

type SpaceListItemProps = {
  space: SpaceData
}

@withRouter
export class SpaceListItem extends React.PureComponent<SpaceListItemProps> {
  go = () => {
    this.props.history.push(`/${this.props.location.pathname.split('/')[1]}/space-details?id=${ this.props.space.uuid }`);
  };

  render () {
    return (
      <Cell before={ <Avatar type={ 'app' } size={ 80 }
                             src={ this.props.space.imageUrls.length > 0 ? `${environment.apiUrl}/image/${this.props.space.imageUrls[0]}` : null }/> }
            onClick={ this.go }
            description={ this.props.space.type }>
        { this.props.space.name }
      </Cell>
    );
  }
}

