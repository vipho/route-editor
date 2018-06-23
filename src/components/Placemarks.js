import React from 'react';
import { Placemark } from 'react-yandex-maps';

export default function( props ) {
    const { placemarks, onDrag } = props;

    return placemarks.map(
        (item, i) => {
            return (
                <Placemark
                    key={item.id}
                    geometry={{
                        coordinates: item.coordinates,
                    }}
                    properties={{
                        hintContent: item.balloonContent,
                        balloonContent: item.balloonContent,
                    }}
                    options={{
                        draggable: 'true',
                    }}
                    onDrag={ ( i => event => onDrag( event, i ) )( i ) }
                />
            )
        }
    )
}