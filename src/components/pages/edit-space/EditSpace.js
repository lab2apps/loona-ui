import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { PanelHeader } from '@vkontakte/vkui';
import { EditSpaceForm } from '../../spaces/edit-space-form/EditSpaceForm';

@withRouter
export class EditSpace extends React.PureComponent {

  get spaceId () {
    return queryString.parse(this.props.location.search).id;
  }

  componentDidMount () {
    console.warn('spaceId', this.spaceId)
  }

  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          {this.spaceId ? 'Изменить' : 'Создать'} площадку
        </PanelHeader>

        <EditSpaceForm spaceId={ this.spaceId }>
        </EditSpaceForm>

      </React.Fragment>
    );
  };

}
