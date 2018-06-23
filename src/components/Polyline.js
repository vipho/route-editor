import React from 'react';
import { Polyline } from 'react-yandex-maps';

export default function( props ) {
    const { placemarks } = props;

    const coordinates = placemarks.map(
        item => {
            return item.coordinates;
        }
    );

    return (
        <Polyline
            geometry={{
                coordinates,
            }}
            options={{
                balloonCloseButton: false,
                strokeColor: '#000',
                strokeWidth: 4,
                strokeOpacity: 0.5,
            }}
        />
    )
}