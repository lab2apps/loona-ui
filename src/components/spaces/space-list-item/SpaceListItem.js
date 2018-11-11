import React from 'react';
import {
  Cell,
  Avatar,
} from '@vkontakte/vkui';
import { withRouter } from 'react-router-dom';
import { environment } from '../../../config/environment';
import { SPACE_TYPES } from '../../../contants/SPACE_TYPES';

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
      <Cell before={<Avatar type={'app'} size={80}
                            src={this.props.space.imageUrls.length > 0 ? `${environment.apiUrl}/image/${this.props.space.imageUrls[0]}` : null}/>}
            onClick={this.go}
            description={<React.Fragment>
              {SPACE_TYPES[this.props.space.type]}
              {this.props.space.address && <br/>}
              {this.props.space.address}
            </React.Fragment>}>
        <div className={'l-flex'}>
          <div className='l-flex__item' style={{flexShrink: 1, overflow: 'hidden', textOverflow: 'ellipsis', alignItems: 'center'}}>
          {this.props.space.name}
          {this.props.space.name}
          {this.props.space.name}
          </div>

          <div className='l-flex__item' style={{flexGrow: 0}}>
          {this.props.space.myRent && <div className='l-indicator--rented'>арендую</div>}
          </div>
        </div>
      </Cell>
    );
  }
}

