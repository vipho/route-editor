import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { YMaps, Map } from 'react-yandex-maps';
import PlacemarkList from './PlacemarkList';
import Placemarks from './Placemarks';

const mapState = { center: [55.736807, 37.618471], zoom: 15 };

class App extends React.Component {
    constructor() {
        super();

        this.nextPlacemarkId = 0;
    }

    state = {
        placemarkName: '',
        placemarks: [],
    };

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Новая точка маршрута"
                                   value={ this.state.placemarkName }
                                   onChange={ this.onChange }
                            />
                        </div>
                    </form>
                    <ul className="list-group">
                        <PlacemarkList placemarks={ this.state.placemarks }
                                       deletePlacemark={ this.deletePlacemark.bind(this) }
                        />
                    </ul>
                </div>
                <div className="col-8">
                    <YMaps>
                        <Map state={mapState}
                             width="100%"
                             height="500px"
                             instanceRef={ this.getMapRef }
                        >
                            <Placemarks placemarks={ this.state.placemarks }
                                        onDrag={ this.onDrag.bind(this) }
                            />
                        </Map>
                    </YMaps>
                </div>
            </div>
        )
    };

    getMapRef = ref => {
        this.mapRef = ref;
    };

    onDrag = ( event, i ) => {
        const placemark = event.get( 'target' );

        let newPlacemarks = this.state.placemarks.slice();
        newPlacemarks[ i ].coordinates = placemark.geometry.getCoordinates();

        this.setState({
            placemarkName: '',
            placemarks: newPlacemarks,
        });
    };

    onChange = event => {
        this.setState({ placemarkName: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        if( this.state.placemarkName.length === 0 )
            return;

        const newPlacemark = {
            id: this.nextPlacemarkId++,
            balloonContent: this.state.placemarkName,
            coordinates: this.mapRef.getCenter(),
        };
        this.setState({
            placemarkName: '',
            placemarks: [...this.state.placemarks, newPlacemark],
        });
    };

    deletePlacemark = i => {
        let newPlacemarks = this.state.placemarks.slice();
        newPlacemarks.splice( i, 1 );

        this.setState({
            placemarkName: '',
            placemarks: newPlacemarks,
        });
    }
}

export default App;