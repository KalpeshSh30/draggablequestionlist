import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsFromBackend: [
        { id: 'Q1', content: "How long is the lease term?", ans: '24 Months'},
        { id: 'Q2', content: "Are utilities included?", ans: 'Yes' },
        { id: 'Q3', content: "Are pets allowed?", ans: 'No' },
        { id: 'Q4', content: "When is rent due and how do I pay it?", ans: '12th of every month'},
        { id: 'Q5', content: "Is the security deposit refundable", ans: 'Partial' }
      ],
      itemsDropped: [

      ]
    }
  }

  onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(destination);
    if(destination && destination.droppableId === 'itemsDropped'){
      if (source.droppableId !== destination.droppableId) {
        const source_col = source.droppableId;
        const dest_col = destination.droppableId;
        const source_items = this.state[source_col];
        const dest_items = this.state[dest_col];
        const [removed] = source_items.splice(source.index, 1);
        dest_items.splice(destination.index, 0, removed);
        this.setState({
          itemsFromBackend: source_items,
          itemsDropped: dest_items
        })
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div className="App">
          <DragDropContext
            onDragEnd={result => this.onDragEnd(result)}
          >
            <div
              key={'itemsFromBackend'}
              className='draggable-questions-list'
            >
              <h2>Questionnaire</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={'itemsFromBackend'} key={'itemsFromBackend'}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {this.state.itemsFromBackend.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='draggablelist'
                                  >
                                    {`${item.id}.   ${item.content} `}
                                    <br/>
                                    {`A${index+1}.   ${item.ans}`}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
            <div
              key={'itemsDropped'}
              className='dropable-questions-list'
            >
              <h2>Drop Here</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={'itemsDropped'} key={'itemsDropped'}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {this.state.itemsDropped.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='draggablelist'
                                  >
                                     {`${item.id}.   ${item.content} `}
                                    <br/>
                                    {`A${index+1}.   ${item.ans}`}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div >
    );
  }
}

export default App;
