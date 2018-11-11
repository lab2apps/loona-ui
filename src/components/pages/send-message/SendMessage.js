import React from 'react';
import {
  PanelHeader,
  Cell,
  HeaderButton,
  IOS,
  platform,
  Group,
  List,
  FormLayout,
  Textarea,
  Button,
} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { withRouter } from 'react-router-dom';
import Icon24About from '@vkontakte/icons/dist/24/about';
import axios from 'axios';
import { environment } from '../../../config/environment';
import querystring from 'query-string';

const osname = platform();

@withRouter
export class SendMessage extends React.PureComponent {
  onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    axios.get(`${environment.apiUrl}/api/notify`, {
      params: {
        spaceId: querystring.parse(this.props.location.search).spaceId,
        message: formData.get('message'),
      }
    }).then(() => {
      this.props.history.goBack();
    });
  };

  render () {
    return (
      <React.Fragment>
        <PanelHeader
          addon={<HeaderButton onClick={this.props.history.goBack}>Отменить</HeaderButton>}
          left={
            <HeaderButton onClick={this.props.history.goBack}>{
              osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </HeaderButton>
          }>
          Рассылка
        </PanelHeader>

        <Group>
          <List>
            <Cell multiline> {/* FOR ADMINS ONLY */}
              <div className='l-notification'>
                <div className="l-notification__icon" style={{ color: 'var(--steel_gray_500)' }}>
                  <Icon24About/>
                </div>
                <div className="l-notification__content l-text-gray">
                  Сообщение получат резиденты вашей площадки и те, кто подписан на нее
                </div>
              </div>
            </Cell>
          </List>
        </Group>

        <Group>
          <List>
            <Cell multiline> {/* FOR ADMINS ONLY */}
              <FormLayout className="l-bg-white" onSubmit={ this.onSubmit } name={ 'test' }>
                 <Textarea top="Сообщение резидентам" name={ 'message' }/>

                <Button size="xl" level="primary">Отправить</Button>
              </FormLayout>
            </Cell>
          </List>
        </Group>
      </React.Fragment>
    );
  }
}
