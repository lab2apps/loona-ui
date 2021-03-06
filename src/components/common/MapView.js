import React from 'react';
import { YMaps as YMapsContainer, Map as YMap, Placemark } from 'react-yandex-maps';
import { withRouter } from 'react-router-dom';

export type Point = {
  name: string,
  coords: number[],
}

type MavViewProps = {
  points: Point[]
}

@withRouter
export class MapView extends React.PureComponent<MavViewProps> {

  state = {
    mapOptions: {
      center: [59.931236500000004, 30.301899499999998], // Питер
      zoom: 9,
    },
    currentCoordinates: null,
    mapInstance: null,
  };

  constructor (props) {
    super(props);
  }

  ready () {
    const mapInstance = this.state.mapInstance;
    const geoObjects  = mapInstance.geoObjects;
  }

  componentDidUpdate (...args) {
    //if (this.state.mapInstance && this.state.currentCoordinates) {
    if (this.state.mapInstance) {
      this.ready();
    }
  }

  mapRef = (mapInstance) => {
    console.log('mapInstance', mapInstance);
    this.setState({ mapInstance });
  };

  componentDidMount (...args) {
    console.warn('componentDidMount', ...args);

    this.getCurrentPosition()
      .then((position) => {

      })
      .catch((err) => {
        console.warn('geolocation error', err);
      });
  }

  render () {
    return (
      <React.Fragment>
        <YMapsContainer version="2.1">
          <YMap defaultState={this.state.mapOptions} instanceRef={this.mapRef} width="100%" height="100%">
            {
              this.props.points.map((point) => <Placemark geometry={point.coords}
                                                          properties={{
                                                            iconContent: point.name,
                                                          }}
                                                          options={{
                                                            preset: 'islands#blackStretchyIcon'
                                                          }}
                                                          key={point.id} onClick={() => {
                this.props.history.push('/all/space-details?id=' + point.id);
              }}/>)
            }
          </YMap>
        </YMapsContainer>
      </React.Fragment>
    );
  }

  getCurrentPosition () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then((position) => {
      const { latitude, longitude } = position.coords;

      this.setState({
        currentCoordinates: [latitude, longitude],
        mapOptions: {
          ...this.state.mapOptions,
          center: [latitude, longitude],
        },
      });

      return position;
    })
  }

  geoCode (addressString) {
    return window.ymaps.geocode(addressString).then(function (res) {
      console.warn(res);
    });
  }
}
