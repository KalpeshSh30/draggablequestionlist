import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './DraggableLists.css';

class DraggableLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <span>Questions</span>
                <Droppable droppableId='questions'>
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.props.questionnaire.questions.map((ele) => {
                                    return (

                                        <Draggable draggableId="ele.id">
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {ele.ques}
                                                    </div>
                                                )
                                            }}
                                        </Draggable>

                                    )
                                })}
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        );
    }
}

export default DraggableLists;