import React from 'react';

function PlacemarkList( props ) {
    const { placemarks, deletePlacemark } = props;

    return placemarks.map( ( item, i ) => (
        <li className="list-group-item d-flex justify-content-between align-items-center"
            key={ item.id }
        >
            {item.balloonContent}

            <span style={ {cursor: "pointer"} }
                  onClick={ ( i => () => deletePlacemark( i ) )( i ) }
            >
                &times;
            </span>
        </li>
    ));
}

export default PlacemarkList;