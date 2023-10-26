import { Button, Container, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const LandingTask = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  return (
    <Container className="mt-2">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Stack>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <TextField
                  sx={{ m: 2 }}
                  {...register(`test.${index}.firstName`)}
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  sx={{ m: 2 }}
                  {...register(`test.${index}.lastName`)}
                  id="outlined-basic"
                  label="Outlined"
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
              </li>
            ))}
          </ul>
          <Button
            type="button"
            onClick={() => append({ firstName: "bill", lastName: "luo" })}
          >
            append
          </Button>
          <input type="submit" />
        </Stack>
      </form>
    </Container>
  );
};

export default LandingTask;
