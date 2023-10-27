import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const Landing = () => {
  const [tasks, setTasks] = useState([]);
  const [showingData, setShowingData] = useState([
    {
      id: 1,
      fname: "Khurshida Jahan",
      lname: "Meem",
    },
    {
      id: 2,
      fname: "Khurshida",
      lname: "Meem",
    },
    {
      id: 3,
      fname: "Khurshida M",
      lname: "Meem",
    },
  ]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const data = reorder(tasks, result.source.index, result.destination.index);
    //store reordered state.
    setTasks(data);
    setShowingData(data);
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div>
          <Droppable droppableId="AllQuestion">
            {(queDropProvided) => (
              <div
                ref={queDropProvided.innerRef}
                {...queDropProvided.droppableProps}
              >
                {showingData?.map((item, index) => {
                  return (
                    <Draggable
                      key={item?.id}
                      draggableId={item?.id.toString()}
                      index={index}
                    >
                      {(queProvided, index) => (
                        <div
                          ref={queProvided.innerRef}
                          {...queProvided.draggableProps}
                          {...queProvided.dragHandleProps}
                          index={index}
                        >
                          <div>
                            <p>{item?.fname}</p>
                            <p>{item?.lname}</p>
                          </div>
                          {/* <DragIndicatorIcon sx={{ fontSize: "12px" }} /> */}
                          <h1>Drag me</h1>
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {queDropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Landing;
