import { Button, Container, Stack, TextField } from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";

const LandingTask = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove, move } = useFieldArray({
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

  console.log(fields);
  return (
    <Container className="mt-2">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <DragDropContext onDragEnd={reorder}>
          <Droppable droppableId="parent" type="parentContainer">
            {(provided, snapshot) => (
              <Stack
                direction="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {fields.map((item, index) => (
                  <Draggable
                    key={item?.keyId}
                    draggableId={item?.keyId.toString()}
                    index={index}
                  >
                    {(customStageProvided) => (
                      <div
                        ref={customStageProvided.innerRef}
                        {...customStageProvided.draggableProps}
                        {...customStageProvided.dragHandleProps}
                        style={{
                          backgroundColor: "lightgrey",
                          margin: "8px",
                        }}
                      >
                        <div>
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
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>

        <div className="ml-2">
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              console.log(fields.length);
              append({
                keyId: fields.length + 1,
                firstName: "",
                lastName: "",
              });
            }}
          >
            append
          </Button>
          <Button sx={{ ml: 2 }} type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LandingTask;
