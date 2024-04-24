export const loginController = async ({ name, email }) => {
  return fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => res.json());
};
