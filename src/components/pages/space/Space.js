import React from 'react';
import {
  Div, PanelHeader,
} from '@vkontakte/vkui';
import { SpaceDetails } from '../../spaces/space-details/SpaceDetails';
import { getSpace } from '../../../store/actions/spaceActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import querystring from 'query-string';
import { withRouter } from 'react-router-dom';

type SpaceDetailsProps = {}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class Space extends React.PureComponent<SpaceDetailsProps> {
  componentDidMount () {
    const { id } = querystring.parse(this.props.location.search);

    this.props.getSpace(id);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Детали площадки
        </PanelHeader>

        { !this.props.fetching &&
        <SpaceDetails space={ this.props.space }>
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
