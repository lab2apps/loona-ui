import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Main } from './components/pages/main/Main';

import 'styles/app.scss';
import { EditRoomForm } from './components/rooms/edit-room-form/EditRoomForm';
import { EditSpaceForm } from './components/spaces/edit-space-form/EditSpaceForm';



export class App extends Component {
  render () {
    return (
      <div>
        {/* DEBUG ROUTER */}
        <div><Link to="/edit-room">Main</Link></div>
        <div><Link to="/edit-room">EditRoomForm</Link></div>
        <div><Link to="/edit-space">EditSpaceForm</Link></div>

        <Switch>
          <Route path='/' exact={ true } component={ Main }/>
          <Route path='/edit-room' exact={ true } component={ EditRoomForm }/>
          <Route path='/edit-space' exact={ true } component={ EditSpaceForm }/>
        </Switch>
      </div>
    );
  }
}
