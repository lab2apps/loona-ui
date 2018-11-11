import React from 'react';
import {
  IOS,
  PanelHeader,
  platform,
  HeaderButton
} from '@vkontakte/vkui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import querystring from 'query-string';
import { withRouter } from 'react-router-dom';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import { SpaceDetails } from '../../spaces/space-details/SpaceDetails';
import { getSpace } from '../../../store/actions/spaceActions';

const osname = platform();

type SpaceDetailsProps = {}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class Space extends React.PureComponent<SpaceDetailsProps> {
  componentDidMount () {
    this.getSpace();
  }

  getSpace = (fetching = true) => {
    const { id } = querystring.parse(this.props.location.search);

    this.props.getSpace(id, fetching);
  };

  render () {
    return (
      <React.Fragment>
        <PanelHeader
          addon={<HeaderButton onClick={this.props.history.goBack}>Назад</HeaderButton>}
          left={
            <HeaderButton onClick={this.props.history.goBack}>{
              osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }>
          Детали площадки
        </PanelHeader>

        {!this.props.fetching &&
        <SpaceDetails space={this.props.space}
                      onLike={() => {
                        this.getSpace(false)
                      }}>
        </SpaceDetails>
        }

      </React.Fragment>
    );
  }
}

function mapStateToProps (state) {
  return state.space;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getSpace,
  }, dispatch);
}
