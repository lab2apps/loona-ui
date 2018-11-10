import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import { EditSpaceForm } from '../../spaces/edit-space-form/EditSpaceForm';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import type { RootState } from '../../../store/reducers/rootReducer';
import { getSpace } from '../../../store/actions/spaceActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const osname = platform();

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export class EditSpace extends React.PureComponent {

  get spaceId () {
    return queryString.parse(this.props.location.search).spaceId;
  }

  componentDidMount () {
    if (this.spaceId) {
      this.props.getSpace(this.spaceId);
    }
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader addon={ <HeaderButton onClick={ this.props.history.goBack }>Назад</HeaderButton> }
                     left={ <HeaderButton onClick={ this.props.history.goBack }>{ osname === IOS ?
                       <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>
          { this.spaceId ? 'Ред. площадки' : 'Создать площадку' }
        </PanelHeader>

        { this.spaceId && !this.props.fetching &&
        <EditSpaceForm spaceId={ this.spaceId } space={ this.props.space }/> }
        { !this.spaceId && <EditSpaceForm/> }
      </React.Fragment>
    );
  };

}

function mapStateToProps (state: RootState) {
  return state.space;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getSpace }, dispatch);
}
