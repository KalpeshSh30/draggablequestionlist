import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsFromBackend: [
        { id: 'Q1', content: "How long is the lease term?", ans: '24 Months' },
        { id: 'Q2', content: "Are utilities included?", ans: 'Yes' },
        { id: 'Q3', content: "Are pets allowed?", ans: 'No' },
        { id: 'Q4', content: "When is rent due and how do I pay it?", ans: '12th of every month' },
        { id: 'Q5', content: "Is the security deposit refundable", ans: 'Partial' }
      ],
      textArea: `Client Name : \nClient Company : \nAddress : `,
      position: 0
    }
  }

  onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(destination);
    if (destination && destination.droppableId === 'itemsDropped') {
      if (source.droppableId !== destination.droppableId) {
        const source_col = source.droppableId;
        const source_items = this.state[source_col];
        const [removed] = source_items.splice(source.index, 1);
        removed.id =  `<<`.concat(removed.id.concat(`>>`));
        const updatedInfo = this.state.textArea.slice(0, this.state.position).concat(removed.id.concat(this.state.textArea.slice(this.state.position, this.state.textArea.length+1)))
        this.setState({
          itemsFromBackend: source_items,
          textArea: updatedInfo
        })
      }
    }
  }

  handleMouseEvent = evt => {
    console.log(evt.target.selectionStart);
    this.setState({
      position: evt.target.selectionStart
    })
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
              <div style={{ margin: 8 }} >
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
                                    <br />
                                    {`A.   ${item.ans}`}
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
                <Droppable droppableId={'itemsDropped'} key={'itemsDropped'}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{height:'90%'}}
                      >
                        <textarea 
                              className='dropable-textarea' 
                              value={this.state.textArea}
                              onMouseUp={this.handleMouseEvent}
                        >
                        </textarea>
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div >
    );
  }
}

export default App;
