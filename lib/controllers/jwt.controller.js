export const verifyJWTController = async (token) => {
  return await fetch(`http://localhost:8000/api/jwt/${token}`).then((res) =>
    res.json()
  );
};
