import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function PlacemarkList( props ) {
    const { placemarks, onDragEnd, deletePlacemark } = props;

    // return placemarks.map( ( item, i ) => (
    //     <li className="list-group-item d-flex justify-content-between align-items-center"
    //         key={ item.id }
    //     >
    //         {item.balloonContent}
    //
    //         <span style={ {cursor: "pointer"} }
    //               onClick={ ( i => () => deletePlacemark( i ) )( i ) }
    //         >
    //             &times;
    //         </span>
    //     </li>
    // ));

    return (
        <DragDropContext onDragEnd={ onDragEnd }>
            <Droppable droppableId="droppable">
                {provided => (
                    <ul ref={provided.innerRef} className="list-group">
                        {placemarks.map((item, i) => (
                            <Draggable key={item.id} draggableId={item.id} index={i}>
                                {provided => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {item.balloonContent}
                                        <span style={ {cursor: "pointer"} }
                                              onClick={ ( i => () => deletePlacemark( i ) )( i ) }
                                        >
                                            &times;
                                        </span>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default PlacemarkList;