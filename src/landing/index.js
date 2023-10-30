import { Button, Container, Stack, TextField } from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";

const LandingTask = () => {
  const { control, register, handleSubmit } = useForm({});

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "test",
  });
  const childrenRef = React.useRef({});

  const reorder = (result) => {
    console.log(result);
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    const sourceIndex = source.index;
    const destIndex = destination.index;

    if (type === "parentContainer") {
      move(sourceIndex, destIndex);
    } else if (type === "childContainer" && source.droppableId) {
      const reorderChild = childrenRef.current[source.droppableId];
      if (reorderChild) {
        reorderChild(sourceIndex, destIndex);
      }
    }
  };

  const onSubmit = (data) => console.log("data", data);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DragDropContext onDragEnd={reorder}>
          <Droppable droppableId="parent" type="parentContainer">
            {(provided) => (
              <Stack
                sx={{ backgroundColor: "blue" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {fields.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            style={{
                              backgroundColor: "lightgrey",
                              margin: "8px",
                            }}
                            {...provided.dragHandleProps}
                          >
                            <TextField
                              sx={{ m: 2 }}
                              {...register(`test.${index}.firstName`)}
                              id="outlined-basic"
                              label="First Name"
                              variant="outlined"
                              size="small"
                            />
                            <TextField
                              sx={{ m: 2 }}
                              {...register(`test.${index}.lastName`)}
                              id="outlined-basic"
                              label="Last Name"
                              variant="outlined"
                              size="small"
                            />

                            <Button
                              sx={{ mt: 2 }}
                              variant="contained"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </Button>
                          </div>

                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
          <div className="mt-2">
            <Button variant="contained" onClick={() => append({ value: "0" })}>
              Append
            </Button>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </DragDropContext>
      </form>
    </Container>
  );
};

export default LandingTask;
