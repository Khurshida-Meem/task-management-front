import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const Landing = () => {
  const [tasks, setTasks] = useState([]);
  const [showingData, setShowingData] = useState([]);

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
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(queProvided, index) => (
                        <div
                          ref={queProvided.innerRef}
                          {...queProvided.draggableProps}
                          {...queProvided.dragHandleProps}
                          index={index}
                        >
                          {/* <DragIndicatorIcon sx={{ fontSize: "12px" }} /> */}
                          <p>Drag me</p>
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
