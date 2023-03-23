import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createUser } from "./apifunctions/api";
import { useForm } from "react-hook-form";

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onMutate: async (newUser) => {
      // Previous data
      const previousUsers = queryClient.getQueryData("user");

      queryClient.setQueryData("user", (old) => [...old, newUser]);

      return { previousUsers };
    },
    onSuccess: () => {
      console.log("Sucess");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  if (isLoading) return <h3>Loading...</h3>;

  const onSubmit = (data) => {
    console.log(data);
    mutate({ ...data });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("username", { required: true })} />
      {errors.username && <p>This field is required</p>}
      <input type="text" {...register("email", { required: true })} />
      <input type="submit" value="Submit" />
    </form>
  );
};
