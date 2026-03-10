const BASE_URL = "http://localhost:3000/api/v1/auth";

// const getToken = () => localStorage.getItem("token");

export const registerUser = async (username, email, password) => {
  console.log(BASE_URL);
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  const data = JSON.parse(text);

  if (!res.ok) {
    throw new Error(data.message || "login failed");
  }

  return data;
};
