import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import { EditSpaceForm } from '../../spaces/edit-space-form/EditSpaceForm';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

@withRouter
export class EditSpace extends React.PureComponent {

  get spaceId () {
    return queryString.parse(this.props.location.search).id;
  }

  componentDidMount () {
    console.warn('spaceId', this.spaceId);
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader addon={ <HeaderButton onClick={ this.props.history.goBack }>Назад</HeaderButton> }
                     left={ <HeaderButton onClick={ this.props.history.goBack }>{ osname === IOS ?
                       <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>
          { this.spaceId ? 'Изменить' : 'Создать' } площадку
        </PanelHeader>

        <EditSpaceForm spaceId={ this.spaceId }>
        </EditSpaceForm>
      </React.Fragment>
    );
  };

}
