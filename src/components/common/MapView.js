import React from 'react';
import { YMaps as YMapsContainer, Map as YMap, Placemark } from 'react-yandex-maps';

type MavViewProps = {}

export class MapView extends React.PureComponent<MavViewProps> {

  state = {
    mapOptions: {
      center: [55.75, 37.57],
      zoom: 9,
    },
    currentCoords: null,
  };

  mapState = {
    center: [55.75, 37.57],
    zoom: 9,
  };

  constructor (props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.warn('geolocation ok');
        const { latitude, longitude } = position.coords;

        this.setState({
          currentCoords: [latitude, longitude],
        });

        console.warn(this.state.currentCoords);
      },
      (...args) => {
        console.warn('geolocation error', ...args);
      },
    )
  }

  render () {
    return (
      <React.Fragment>
        <YMapsContainer>
          <YMap defaultState={this.state.mapOptions} instanceRef={this.mapRef} width="100%" height="100%">
            <Placemark geometry={this.state.mapOptions.center}/>
          </YMap>
        </YMapsContainer>
      </React.Fragment>
    );
  }
}
