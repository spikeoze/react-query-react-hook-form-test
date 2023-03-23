import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUser, deleteUser } from "./apifunctions/api";

export const Users = () => {
  const queryClient = useQueryClient();

  const listUsers = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const removeUser = useMutation({
    mutationFn: deleteUser,
    onMutate: () => {
      console.log("Sucess");
    },
    onSuccess: () => {
      console.log("Invalidated...");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  if (listUsers.isLoading) return <h3>Loading ....</h3>;
  return (
    <div>
      {listUsers.data.map((user) => {
        return (
          <ul key={user.id}>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            {removeUser.isLoading ? (
              <h4>Loading...</h4>
            ) : (
              <h4 onClick={() => removeUser.mutate(user.id)}>Delete</h4>
            )}
          </ul>
        );
      })}
    </div>
  );
};
