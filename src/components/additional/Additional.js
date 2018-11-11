import React from 'react';
import { PanelHeader, Group, List, Cell, Div } from '@vkontakte/vkui';

import Icon24Poll from '@vkontakte/icons/dist/24/poll';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';

import { LogoIcon } from '../common/Icons';

export class Additional extends React.PureComponent {
  render () {
    return (
      <React.Fragment>
        <PanelHeader>
          Дополнительно
        </PanelHeader>

        <Group>
          <List>
            <div style={{
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: '20px',
            }}>
              <LogoIcon className={'l-logo-small'}/>

              Скоро в нашем приложении
            </div>

            <Cell before={<Icon24Poll/>}>Статистика</Cell>
            <Cell before={<Icon24MoneyTransfer/>}>Автоплатежи</Cell>
            <Cell before={<Icon24Globe/>}>Улучшенный поиск</Cell>
            <Cell before={<Icon24Place/>}>Навигация внутри площадок</Cell>
            <Cell before={<Icon24Qr/>}>Check-in с помощью QR-кода</Cell>
          </List>
        </Group>
      </React.Fragment>
    );
  }
}
