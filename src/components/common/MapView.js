import React from 'react';
import { YMaps as YMapsContainer, Map as YMap } from 'react-yandex-maps';


type MavViewProps = {
}

export class MapView extends React.PureComponent<MavViewProps> {

  mapState = {
    center: [55.75, 37.57],
    zoom: 9
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  render () {
    return (
      <React.Fragment>
        <YMapsContainer>
          <YMap defaultState={ this.mapState } instanceRef={ this.mapRef } width="100%" height="100%" />
        </YMapsContainer>
      </React.Fragment>
    );
  }
}
