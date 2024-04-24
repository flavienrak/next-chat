export const getUsersController = async () => {
  return await fetch("http://localhost:8000/api/user").then((res) =>
    res.json()
  );
};
